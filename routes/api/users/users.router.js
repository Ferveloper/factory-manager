'use strict';

const express = require('express');
const router = express.Router();
const usersController = require('./users.controller');

router.get('/', usersController.listUsers);
router.get('/:username', usersController.getUser);
router.post('/', usersController.createUser);
router.patch('/:username', usersController.updateUser);
router.delete('/:username', usersController.deleteUser);

module.exports = router;
