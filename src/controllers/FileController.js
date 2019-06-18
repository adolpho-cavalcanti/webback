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
}

module.exports = new FileController();