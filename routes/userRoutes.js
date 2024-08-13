const express = require('express');
const Router = express.Router();
const userController = require('./../controller/userController');

const { getAllUsers, createUser, getUserById, updateUser, deleteUser } = userController;


Router.route('/')
.get(getAllUsers)
.post(createUser);
Router.route('/:id')
.get(getUserById)
.patch(updateUser)
.delete(deleteUser);

module.exports = Router;