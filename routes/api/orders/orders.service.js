'use strict';

const OrderModel = require('./orders.model');
const AssemblyCodeModel = require('../assembly-codes/assembly-codes.model');
const navisionService = require('./navision.service');
const processRoutesConfig = require('./processRoutes.config');
const projection = { _id: 0, __v: 0 };

const getOrderData = async function (id) {

  // Get order headers and lines from Navision
  const ordersHeaders = await navisionService.getHeaders();
  const headers = ordersHeaders.find(header => header.documentNo === id);
  if (!headers) return;

  const ordersLines = await navisionService.getLines();
  const lines = ordersLines.filter(line => line.documentNo === id);
  if (lines.length === 0) throw new Error('Order has no lines');

  // Get assembly codes from DB
  const assemblyCode = await AssemblyCodeModel.findOne({ assemblyCode: headers.assemblyCode }, { _id: 0, __v: 0 });
  if (!assemblyCode) throw new Error('Order has no assembly code in its headers');
  return { headers, lines, assemblyCode };
};

const createOrderObj = function (headers, lines, assemblyCode) {
  const processRoutes = {};
  let duration = 0;

  for (const key in assemblyCode.processRoutes) {
    if (assemblyCode.processRoutes[key] && Number.isInteger(parseInt(key))) {
      processRoutes[key] = {
        value: assemblyCode.processRoutes[key],
        type: processRoutesConfig[key].type,
        class: processRoutesConfig[key].class,
        isActive: true
      };
      if (['time', 'tracking'].includes(processRoutes[key].type) &&
        processRoutes[key].isActive) duration += processRoutes[key].value;
    }
  }

  const order = {
    id: headers.documentNo,
    isImported: false,
    isPlanned: false,
    startDate: null,
    duration,
    headers: {
      ...headers,
      machine: assemblyCode.machine,
      batchLitres: assemblyCode.batchLitres,
      quantityToAssemble: assemblyCode.batchLitres
    },
    lines: lines
      // .map(line => convertKeysToCamelCase(line))
      .map(line => {
        if (typeof line.quantity === 'string') {
          line.quantity = parseFloat(line.quantity.replace(/\./g, '').replace(/,/g, '.'));
        }
        return line;
      }),
    processRoutes
  };

  return order;
};

const getNotImportedOrders = async function (importedOrdersIds) {

  // Get orders headers and lines from Navision
  const ordersHeaders = await navisionService.getHeaders();
  const ordersLines = await navisionService.getLines();

  // Get assembly codes from DB
  const assemblyCodes = await AssemblyCodeModel.find({}, { _id: 0, __v: 0 });

  // Get orders not imported in DB
  const notImportedOrdersIds = ordersHeaders
    .map(header => header.documentNo)
    .filter(documentNo => !importedOrdersIds.includes(documentNo));

  let notImportedOrders = [];
  for (const orderId of notImportedOrdersIds) {

    // Get headers, lines and assembly code for current order
    const headers = ordersHeaders.find(header => header.documentNo === orderId);
    const lines = ordersLines.filter(line => line.documentNo === orderId);
    const assemblyCode = assemblyCodes.find(code => code.assemblyCode === headers.assemblyCode);

    // If there are no lines or assembly code, skip this order
    if (lines.length === 0 || !assemblyCode) continue;

    // Create order object and push it to the list
    const orderObj = createOrderObj(headers, lines, assemblyCode);
    notImportedOrders.push(orderObj);
  }

  return notImportedOrders;
};

module.exports = {
  list: async function () {

    // Get orders already imported and assembly codes from DB
    const importedOrders = await OrderModel.find({}, projection);

    // Get orders not imported in DB
    const importedOrdersIds = importedOrders.length === 0 ? [] : importedOrders.map(order => order.headers.documentNo);
    const notImportedOrders = await getNotImportedOrders(importedOrdersIds);

    // Add created objects to orders from DB
    const orders = importedOrders.concat(notImportedOrders);

    return orders;
  },
  get: async function (id) {
    // Return order from DB id exists
    let order = await OrderModel.findOne({ id }, projection);
    if (order) return order;

    // Otherwise, get order from Navision
    const orderData = await getOrderData(id);
    if (!orderData) return;
    const { headers, lines, assemblyCode } = orderData;

    order = createOrderObj(headers, lines, assemblyCode);

    return order;
  },
  import: async function (id) {
    // Check that order id is not already present in DB
    let importedOrder = await OrderModel.findOne({ id }, projection);
    if (importedOrder) return { isAlreadyImported: true };

    // If not in DB, get order from Navision
    const orderData = await getOrderData(id);
    if (!orderData) return;
    const { headers, lines, assemblyCode } = orderData;

    const orderObj = createOrderObj(headers, lines, assemblyCode);

    // Save order in DB
    importedOrder = await OrderModel.create(orderObj);

    importedOrder = await OrderModel.findOne({ id }, projection);

    // Get order process routes from DB
    return importedOrder;
  },
  update: async function (id, orderDTO) {
    const order = await OrderModel.findOneAndUpdate({ id }, orderDTO, { new: true, projection, runValidators: true });
    return order;
  },
  delete: async function (id) {
    const order = await OrderModel.findOneAndDelete({ id }, { projection });
    return order;
  }
};
