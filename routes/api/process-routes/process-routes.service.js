'use strict';

const ProcessRoutesModel = require('./process-routes.model');

module.exports = {
  list: async function () {
    const processRoutes = await ProcessRoutesModel.find();
    return processRoutes.map(doc => doc.toObject());
  },
  get: async function (processRouteCode) {
    const processRoute = await ProcessRoutesModel.findOne({ code: processRouteCode });
    return processRoute ? processRoute.toObject() : null;
  },
  create: async function (processRouteDTO) {
    const processRoute = await ProcessRoutesModel.create(processRouteDTO);
    return processRoute ? processRoute.toObject() : null;
  },
  update: async function (processRouteCode, processRouteDTO) {
    const processRoute = await ProcessRoutesModel.findOneAndUpdate({ code: processRouteCode }, processRouteDTO, { new: true, runValidators: true });
    return processRoute ? processRoute.toObject() : null;
  },
  delete: async function (processRouteCode) {
    const processRoute = await ProcessRoutesModel.findOneAndDelete({ code: processRouteCode });
    return processRoute ? processRoute.toObject() : null;
  }
};
