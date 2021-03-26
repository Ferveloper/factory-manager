'use strict';

const mongoose = require('mongoose');

const orderHeadersSchema = new mongoose.Schema({
  documentNo: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  itemNo: { type: Number, required: true },
  locationCode: { type: Number, required: true },
  postingDate: { type: String, required: true },
  dueDate: { type: String, required: true },
  quantity: { type: Number, required: true },
  unitOfMeasure: { type: String, required: true },
  quantityPer: { type: Number, required: true },
  status: { type: String, required: true },
  assemblyCode: { type: String, required: true },
  machine: { type: String, required: true },
  batchLitres: { type: Number, required: true },
  quantityToAssemble: { type: Number, required: true, default: function () { return this.batchLitres; } }
});

const orderLinesSchema = new mongoose.Schema({
  documentNo: { type: String, required: true },
  lineNo: { type: Number, required: true },
  type: { type: String, required: true },
  componentNo: { type: String, required: true },
  description: { type: String, required: true },
  locationCode: { type: Number, required: true },
  quantity: { type: Number, required: true },
  consumedQuantity: { type: Number, required: true },
  itemPostingGroup: { type: String, required: true },
  unitOfMeasure: { type: String, required: true }
});

const routeCodeSchema = new mongoose.Schema({
  value: { type: Number, required: true },
  isActive: { type: Boolean, required: true, default: true }
});

const processRoutesSchema = new mongoose.Schema({
  510: routeCodeSchema,
  520: routeCodeSchema,
  530: routeCodeSchema,
  540: routeCodeSchema,
  550: routeCodeSchema,
  560: routeCodeSchema,
  570: routeCodeSchema,
  810: routeCodeSchema,
  820: routeCodeSchema,
  830: routeCodeSchema,
  840: routeCodeSchema,
  850: routeCodeSchema,
  860: routeCodeSchema,
  870: routeCodeSchema,
  880: routeCodeSchema,
  890: routeCodeSchema,
  910: routeCodeSchema,
  920: routeCodeSchema
});

const orderSchema = mongoose.Schema({
  id: { type: String, required: true, unique: true },
  isImported: { type: Boolean, required: true, default: true },
  headers: { type: [orderHeadersSchema], require: true },
  lines: { type: [orderLinesSchema], require: true },
  processRoutes: { type: processRoutesSchema, required: true }
});

const OrderModel = mongoose.model('Order', orderSchema);

module.exports = OrderModel;
