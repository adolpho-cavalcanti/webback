const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');

const routes = express.Router();

const FileController = require('./controllers/FileController');

routes.post(
  "/files",
  multer(multerConfig).single('file'),
  FileController.store);

module.exports = routes;