'use strict';

const mongoose = require('mongoose');

const processRoutesSchema = new mongoose.Schema({
  _id: false,
  510: { type: mongoose.Mixed, required: true, default: '' },
  520: { type: mongoose.Mixed, required: true, default: '' },
  530: { type: mongoose.Mixed, required: true, default: '' },
  540: { type: mongoose.Mixed, required: true, default: '' },
  550: { type: mongoose.Mixed, required: true, default: '' },
  560: { type: mongoose.Mixed, required: true, default: '' },
  570: { type: mongoose.Mixed, required: true, default: '' },
  810: { type: mongoose.Mixed, required: true, default: '' },
  820: { type: mongoose.Mixed, required: true, default: '' },
  830: { type: mongoose.Mixed, required: true, default: '' },
  840: { type: mongoose.Mixed, required: true, default: '' },
  850: { type: mongoose.Mixed, required: true, default: '' },
  860: { type: mongoose.Mixed, required: true, default: '' },
  870: { type: mongoose.Mixed, required: true, default: '' },
  880: { type: mongoose.Mixed, required: true, default: '' },
  890: { type: mongoose.Mixed, required: true, default: '' },
  910: { type: mongoose.Mixed, required: true, default: '' },
  920: { type: mongoose.Mixed, required: true, default: '' }
});

const assemblyCodeSchema = mongoose.Schema({
  assemblyCode: { type: String, required: true, default: '', unique: true },
  description: { type: String, required: true, default: '' },
  statusCode: { type: Number, required: true, default: '' },
  family: { type: String, required: true, default: '' },
  capacity: { type: Number, required: true, default: '' },
  batchLitres: { type: Number, required: true, default: '' },
  unit: { type: String, required: true, default: '' },
  format: { type: String, required: true, default: '' },
  boxLitres: { type: Number, required: true, default: '' },
  packagesPerBox: { type: Number, required: true, default: '' },
  boxes: { type: Number, required: true, default: '' },
  packages: { type: Number, required: true, default: '' },
  palletsType: { type: String, required: true, default: '' },
  palletNumber: { type: Number, required: true, default: '' },
  formatChange: { type: String, required: true, default: '' },
  cleaning: { type: String, required: true, default: '' },
  numberOfOperators: { type: Number, required: true, default: '' },
  machine: { type: String, required: true, default: '' },
  calculationBaseUnit: { type: String, required: true, default: '' },
  timeCalculationBaseQuantity: { type: Number, required: true, default: '' },
  processRoutes: { type: processRoutesSchema, required: true, default: '' }
});

const AssemblyCodeModel = mongoose.model('AssemblyCode', assemblyCodeSchema);

module.exports = AssemblyCodeModel;