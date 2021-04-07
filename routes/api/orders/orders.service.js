'use strict';

const axios = require('axios');
const OrderModel = require('./orders.model');
const AssemblyCodeModel = require('../assembly-codes/assembly-codes.model');
const { webServiceUrl } = require('../../../config');

const convertKeysToCamelCase = function (obj) {
  const camelCasedObj = {};
  for (const key in obj) {
    const newKey = key.charAt(0).toLowerCase() + key.slice(1);
    camelCasedObj[newKey] = obj[key];
  }
  return camelCasedObj;
};

module.exports = {
  list: async function () {
    // Get orders headers and lines from webservice
    const { data: ordersHeaders } = await axios.get(`${webServiceUrl}/orders-headers`);
    const { data: ordersLines } = await axios.get(`${webServiceUrl}/orders-lines`);

    // Get orders already imported and assembly codes from DB
    const importedOrders = await OrderModel.find({}, { _id: 0, __v: 0 });
    const assemblyCodes = await AssemblyCodeModel.find();

    // Get orders not imported in DB
    const importedOrdersIds = importedOrders.length === 0 ? [] : importedOrders.map(order => order.headers.documentNo);
    const notImportedOrdersIds = ordersHeaders
      .map(header => header.DocumentNo)
      .filter(documentNo => !importedOrdersIds.includes(documentNo));

    // Create objects for not imported orders
    let notImportedOrders = [];
    for (const orderId of notImportedOrdersIds) {
      const headers = ordersHeaders.find(header => header.DocumentNo === orderId);
      const lines = ordersLines.filter(line => line.DocumentNo === orderId);
      const assemblyCode = assemblyCodes.find(code => code.assemblyCode === headers.AssemblyCode);
      if (!assemblyCode) continue;
      const processRoutes = {};
      for (const key in assemblyCode.processRoutes) {
        if (assemblyCode.processRoutes._doc[key] && Number.isInteger(parseInt(key))) {
          processRoutes[key] = { value: assemblyCode.processRoutes._doc[key], isActive: true };
        }
      }
      notImportedOrders.push({
        id: orderId,
        isImported: false,
        headers: {
          ...convertKeysToCamelCase(headers),
          machine: assemblyCode.machine,
          batchLitres: assemblyCode.batchLitres,
          quantityToAssemble: assemblyCode.batchLitres
        },
        lines: lines
          .map(line => convertKeysToCamelCase(line))
          .map(line => {
            if (typeof line.quantity === 'string') {
              line.quantity = parseFloat(line.quantity.replace(/\./g, '').replace(/,/g, '.'));
            }
            return line;
          }),
        processRoutes
      });
    }

    // Add created objects to orders from DB
    const orders = importedOrders.concat(notImportedOrders);

    return orders;
  },
  get: async function (id) {
    // Return order from DB id exists
    let order = await OrderModel.findOne({ id }, { _id: 0, __v: 0 });
    if (order) return order;

    // Otherwise, get order from webservice
    // Get order headers and lines from webservice
    const { data: ordersHeaders } = await axios.get(`${webServiceUrl}/orders-headers`);
    const { data: ordersLines } = await axios.get(`${webServiceUrl}/orders-lines`);

    // Create object for not imported order
    const headers = ordersHeaders.find(header => header.DocumentNo === id);
    if (!headers) return { notFound: true };

    // Get assembly codes from DB
    const assemblyCode = await AssemblyCodeModel.findOne({ assemblyCode: headers.AssemblyCode }, { _id: 0, __v: 0 });
    if (!assemblyCode) return { hasNoAssemblyCode: true };

    const lines = ordersLines.filter(line => line.DocumentNo === id);
    const processRoutes = {};
    for (const key in assemblyCode.processRoutes) {
      if (assemblyCode.processRoutes._doc[key] && Number.isInteger(parseInt(key))) {
        processRoutes[key] = { value: assemblyCode.processRoutes._doc[key], isActive: true };
      }
    }

    order = {
      id,
      isImported: false,
      headers: {
        ...convertKeysToCamelCase(headers),
        machine: assemblyCode.machine,
        batchLitres: assemblyCode.batchLitres,
        quantityToAssemble: assemblyCode.batchLitres
      },
      lines: lines
        .map(line => convertKeysToCamelCase(line))
        .map(line => {
          if (typeof line.quantity === 'string') {
            line.quantity = parseFloat(line.quantity.replace(/\./g, '').replace(/,/g, '.'));
          }
          return line;
        }),
      processRoutes
    };

    return order;
  },
  import: async function (id) {
    // Check that order id is not already present in DB
    const importedOrder = await OrderModel.findOne({ id }, { _id: 0, __v: 0 });
    if (importedOrder) return { isAlreadyImported: true };

    // Get order headers and lines from webservice
    const { data: ordersHeaders } = await axios.get(`${webServiceUrl}/orders-headers`);
    const { data: ordersLines } = await axios.get(`${webServiceUrl}/orders-lines`);

    // Get assembly codes from DB
    const assemblyCodes = await AssemblyCodeModel.find();

    // Create object for not imported order
    const headers = ordersHeaders.find(header => header.DocumentNo === id);
    if (!headers) return { notFound: true };

    const lines = ordersLines.filter(line => line.DocumentNo === id);
    const assemblyCode = assemblyCodes.find(code => code.assemblyCode === headers.AssemblyCode);
    const processRoutes = {};
    for (const key in assemblyCode.processRoutes) {
      if (assemblyCode.processRoutes._doc[key] && Number.isInteger(parseInt(key))) {
        processRoutes[key] = { value: assemblyCode.processRoutes._doc[key], isActive: true };
      }
    }

    // Save order in DB
    let order = await OrderModel.create({
      // id,
      // isImported: true,
      headers: {
        ...convertKeysToCamelCase(headers),
        machine: assemblyCode.machine,
        batchLitres: assemblyCode.batchLitres
      },
      lines: lines
        .map(line => convertKeysToCamelCase(line))
        .map(line => {
          if (typeof line.quantity === 'string') {
            line.quantity = parseFloat(line.quantity.replace(/\./g, '').replace(/,/g, '.'));
          }
          return line;
        }),
      processRoutes
    });

    order = await OrderModel.findOne({ id }, { _id: 0, __v: 0 });

    // Get order process routes from DB
    return order;
  },
  update: async function (id, orderDTO) {
    const order = await OrderModel.findOneAndUpdate({ id }, orderDTO, { new: true });
    return order;
  },
  delete: async function (id) {
    const order = await OrderModel.findOneAndDelete({ id }, { projection: { _id: 0, __v: 0 } });
    return order;
  }
};
