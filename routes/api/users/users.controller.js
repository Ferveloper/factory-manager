'use strict';

const createError = require('http-errors');
const usersService = require('./users.service');

module.exports = {
  listUsers: async function (req, res, next) {
    try {
      console.log('List users request received');
      const usersList = await usersService.list();
      res.json({
        success: true,
        result: usersList
      });
    } catch (err) {
      next(err);
    }
  },
  getUser: async function (req, res, next) {
    try {
      console.log('Get user request received:', req.params.username);
      const username = req.params.username;
      const user = await usersService.get(username);
      if (!user) throw createError(404, `User ${username} not found`);
      res.json({
        success: true,
        result: user
      });
    } catch (err) {
      next(err);
    }
  },
  createUser: async function (req, res, next) {
    try {
      console.log('Create user request received:', req.body.username);
      const userDTO = req.body;
      const newUser = await usersService.create(userDTO);
      res.json({
        success: true,
        message: `User ${newUser.username} was successfully created`,
        result: newUser
      });
    } catch (err) {
      next(err);
    }
  },
  updateUser: async function (req, res, next) {
    try {
      console.log('Update user request received:', req.params.username);
      const username = req.params.username;
      const userDTO = req.body;
      const updatedUser = await usersService.update(username, userDTO);
      if (!updatedUser) throw createError(404, `User ${username} not found`);
      res.json({
        success: true,
        message: `User ${username} was successfully updated`,
        result: updatedUser
      });
    } catch (err) {
      next(err);
    }
  },
  deleteUser: async function (req, res, next) {
    try {
      console.log('Delete user request received:', req.params.username);
      const username = req.params.username;
      const deletedUser = await usersService.delete(username);
      if (!deletedUser) throw createError(404, `User ${username} not found`);
      res.json({
        success: true,
        message: `User ${username} was successfully deleted`,
        result: deletedUser
      });
    } catch (err) {
      next(err);
    }
  }
};
