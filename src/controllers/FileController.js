const File = require('../models/File');

class FileController {
  async store (req, res) {
    const file = await File.create({
      title: req.file.originalname,
      path: req.file.key,
    });

    await file.save();

    return res.json(file);
  }

  async list (req, res) {
    const file = await File.find();
    return res.json(file);
  }

  async show(req, res) {
    const file = await File.findById(req.params.id);
      return res.json(file);
  }

  async destroy(req, res) {
    const file = await File.findByIdAndRemove(req.params.id);
    return res.send("Arquivo excluído"); 
  } 
}

module.exports = new FileController(); 