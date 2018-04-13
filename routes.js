const path = require('path');
const { Router } = require('express');
const GreetingsController = require('./controllers/greetings');
const UsersController = require('./controllers/users');
const SessionsController = require('./controllers/sessions');
const paginate = require('express-paginate');
const multer = require('multer');
const upload = multer({ dest: path.join(__dirname, 'public', 'uploads') });

const root = Router();
const users = Router();
const session = Router();
const admin = Router();

function authenticate(req, res, next) {
  if (!req.currentUser) {
    res.flash('warning', 'Please Sign In first!');
    res.redirect(`/session/new`);
  } else {
    next();
  }
}
function authenticateAdmin(req, res, next) {
  console.log(`User Role:${req.currentUser.role_name}`);
  if (!req.currentUser || req.currentUser.role_name === 'User') {
    res.flash('warning', 'Please Sign In as Administrator first!');
    res.redirect(`/session/new`);
  } else {
    next();
  }
}

// Root Routes (a.k.a. Base Routes)
// root.use('/');
root.get('/', GreetingsController.index);

//Users Routes
users.use(authenticateAdmin);
root.use('/users', users);
users.get('/new', UsersController.new);
users.post('/', UsersController.create);

//Admin Panel
admin.use(authenticateAdmin);
root.use('/admin', admin);
admin.get('/', GreetingsController.admin);

// Session Routes
root.use('/session', session);
session.get('/new', SessionsController.new);
session.post('/', SessionsController.create);
session.delete('/', SessionsController.destroy);
module.exports = root;
