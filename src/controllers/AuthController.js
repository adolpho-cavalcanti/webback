const User = require('../models/User');

class AuthController {

  register(req, res) {
    const body = req.body;

    const email = body.email;
    const name = body.name;
    const password = body.password;
    const password_confirm = body.password_confirm;

    const errors = [];
    if (name.length < 5) {
      errors['name'] = 'Nome inválido';
    }
    if (email.length < 7) {
      errors['email'] = 'Login inválido'
    }
    if (password.length < 3) {
      errors['password'] = 'Senha curta'
    }
    if (password != password_confirm) {
      errors['password'] = 'As senhas não são iguais'
    }

    User.find({ email }).then((user) => {
      if (typeof user != 'undefined' && user.length > 0 || user._id) {
        errors['email'] = 'Já existe um usuário com esse email';
        console.log(errors);
        return res.json( errors );
      } else {
        if (Object.keys(errors).length == 0) {
          new User(body).save().then((user) => {
            req.session.auth_user = user;
            return res.json({
              user,
              "mensagem": "Usuário registrado!"
            });
          })
        } else {
          return res.json({errors});
        }
      }
    })
  }

  auth(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    User.find({ email, password }).then((user) => {
      console.log(user)
      if (user.length == 1) {
        req.session.auth_user = user;
        return res.json(user);
      } else {
        res.status(403);
        return res.json({ error: "Credenciais inválidas", title: "Fazer email" });
      }
    })
  }

}

module.exports = new AuthController(); 