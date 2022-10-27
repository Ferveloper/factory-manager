'use strict';

const mongoose = require('mongoose');
const processRoutesConfig = require('./processRoutes.config');

const orderHeadersSchema = new mongoose.Schema({
  _id: false,
  documentNo: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  itemNo: { type: String, required: true },
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
  _id: false,
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

const generateProcessRoutesSchema = function (routeCodes) {
  const routesObj = { _id: false };
  routeCodes.forEach(routeCode => routesObj[routeCode] = new mongoose.Schema({
    _id: false,
    value: { type: Number, required: true },
    type: { type: String, required: true, immutable: true, enum: ['cost', 'time', 'tracking'], default: processRoutesConfig[routeCode].type },
    class: { type: String, required: true, immutable: true, enum: ['successive', 'simultaneous'], default: processRoutesConfig[routeCode].class },
    isActive: { type: Boolean, required: true, default: true }
  }));
  return routesObj;
};

const processRoutesSchema = new mongoose.Schema(
  generateProcessRoutesSchema(Object.keys(processRoutesConfig))
);

const orderSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, immutable: true, default: function () { return this.headers.documentNo; } },
  isPlanned: { type: Boolean, required: true, default: false },
  startDate: { type: Date, default: null },
  headers: { type: orderHeadersSchema, required: true },
  lines: { type: [orderLinesSchema], required: true },
  processRoutes: { type: processRoutesSchema, required: true }
}, {
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
});

orderSchema.virtual('duration').get(function () {
  let duration = 0;
  for (const key in this.processRoutes._doc) {
    if (['time', 'tracking'].includes(this.processRoutes._doc[key].type)
      && this.processRoutes._doc[key].isActive) duration += this.processRoutes._doc[key].value;
  }
  return duration;
});

orderSchema.virtual('isImported').get(() => true);

orderSchema.options.toObject = {
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.__v;
    return ret;
  }
};

const OrderModel = mongoose.model('Order', orderSchema);

module.exports = OrderModel;
