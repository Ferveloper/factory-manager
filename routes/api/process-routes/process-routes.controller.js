'use strict';

const createError = require('http-errors');
const processRoutesService = require('./process-routes.service');

module.exports = {
  listProcessRoutes: async function (req, res, next) {
    try {
      console.log('List process routes request received');
      const processRoutes = await processRoutesService.list();
      res.json({
        success: true,
        result: processRoutes
      });
    } catch (err) {
      next(err);
    }
  },
  getProcessRoute: async function (req, res, next) {
    try {
      console.log('Get process route request received:', req.params.id);
      const processRouteId = req.params.id;
      const processRoute = await processRoutesService.get(processRouteId);
      if (!processRoute) throw createError(404, `Process route ${processRouteId} not found`);
      res.json({
        success: true,
        result: processRoute
      });
    } catch (err) {
      next(err);
    }
  },
  createProcessRoute: async function (req, res, next) {
    try {
      console.log('Create process route request received:');
      const processRoutesDTO = req.body;
      const newProcessRoute = await processRoutesService.create(processRoutesDTO);
      res.json({
        success: true,
        message: `Process route ${newProcessRoute.processRoute} was successfully created`,
        result: newProcessRoute
      });
    } catch (err) {
      next(err);
    }
  },
  updateProcessRoute: async function (req, res, next) {
    try {
      console.log('Update process route request received:', req.params.id);
      const processRouteId = req.params.id;
      const processRouteDTO = req.body;
      const updatedProcessRoute = await processRoutesService.update(processRouteId, processRouteDTO);
      if (!updatedProcessRoute) throw createError(404, `Process route ${processRouteId} not found`);
      res.json({
        success: true,
        message: `Process route ${processRouteId} was successfully updated`,
        result: updatedProcessRoute
      });
    } catch (err) {
      next(err);
    }
  },
  deleteProcessRoute: async function (req, res, next) {
    try {
      console.log('Delete process route request received:', req.params.username);
      const processRouteId = req.params.id;
      const deletedProcessRoute = await processRoutesService.delete(processRouteId);
      if (!deletedProcessRoute) throw createError(404, `Process route ${processRouteId} not found`);
      res.json({
        success: true,
        message: `Process route ${processRouteId} was successfully deleted`,
        result: deletedProcessRoute
      });
    } catch (err) {
      next(err);
    }
  }
};
