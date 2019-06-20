const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

mongoose.connect('mongodb+srv://elnino:elnino@cluster0-upvky.mongodb.net/projetoweb?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useCreateIndex :  true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

require('./controllers/AuthController')(app);

app.use(require('./routes'));

app.listen(process.env.PORT || 3333);