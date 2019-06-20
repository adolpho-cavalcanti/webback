const File = require('../models/File');

class FileController {
  async store (req, res) {
    const file = await File.create({
      title: req.file.originalname,
      path: req.file.key,
      user: req.userId
    });

    await file.save();

    return res.json({ file });
  }

  async list (req, res) {
    try {
      const file = await File.find().populate('user');
      return res.json({ file, user: req.userId });
    } catch(err) {
      return res.status(400).send({ error: 'Erro de listagem.' });
    }
  }

  async show(req, res) {
    try {
      const file = await File.findById(req.params.id).populate('user');
      return res.json({ file, user: req.userId });
    } catch(err) {
      return res.status(400).send({ error: 'Video nao encontrado.' });
    }
  }

  async destroy(req, res) {
    try {
      await File.findByIdAndRemove(req.params.id);
      
      return res.send('Video deletado'); 
    } catch(err) {
      return res.status(400).send({ error: 'Video nao foi deletado.' });
    }
  } 
}

module.exports = new FileController(); 