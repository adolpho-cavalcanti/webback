const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');

const routes = express.Router();

const FileController = require('./controllers/FileController');

routes.post(
  "/files",
  multer(multerConfig).single('file'),
  FileController.store);

routes.get('/files', (req, res, next) => FileController.list(req, res, next));

routes.get(
  '/files/:id',
  (req, res) => FileController.show(req, res));


routes.delete(
  '/files/:id',
  (req, res, next) => FileController.destroy(req, res, next));

module.exports = routes; 