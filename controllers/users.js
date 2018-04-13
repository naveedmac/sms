const kx = require('../db/connection');
const paginate = require('express-paginate');
const bcrypt = require('bcrypt');
// let utils = require('../this/this');

const UsersController = {
  async checkUser(username, email, password) {
    const [user] = await kx('users')
      .where({ username, email })
      .select('id');
    // console.log('I am ID');

    if (user) {
      // console.log('id:');
      console.log(`User ID:${user.id}`);
      return user;
    } else {
      console.log('User not found');

      return UsersController.createUser(username, email, password);
    }
  },
  async createUser(username, email, password) {
    const passwordDigest = await bcrypt.hash(password, 10);
    console.log('passwordDigest:' + passwordDigest);
    const [user] = await kx
      .insert({ username, email, passwordDigest })
      .into('users')
      .returning('*');
    return user;
  },
  async new(request, response, next) {
    // const user_role = await kx('user_roles').select('*');
    if (request.session.errors) {
      request.session.errors.forEach(error => {
        request.flash('danger', error.msg);
      });
    }
    request.session.errors = null;
    response.render('users/new', {
      success: request.session.success,
      errors: request.session.errors
    });
  },
  async create(request, response, next) {
    // response.send(request.body);
    //Validations
    // console.log('I am in users-Create');
    request
      .check('username', 'Invalid Username - Username must be 6 characters')
      .isLength({ min: 6 });
    request.check('email', 'Invalid Email Address').isEmail();
    request
      .check('password', 'Invalid Password')
      .isLength({ min: 4 })
      .equals(request.body.confirmPassword);
    var errors = request.validationErrors();
    if (errors) {
      request.session.errors = errors;
      request.session.success = false;
      response.redirect('/users/new');
    } else {
      request.session.success = true;
      const {
        username,
        email,
        password,
        confirmPassword,
        user_role
      } = request.body;
      if (password !== confirmPassword) {
        request.flash('danger', 'Password and Confirm Password doesnot match');
        return response.redirect('users/new');
      }
      try {
        const user = UsersController.createUser(username, email, password);
        if (user) {
          console.log('User Created');

          // request.session.userId = user.id;
          request.flash('success', 'User Created Succesfully!');
          response.redirect('/admin');
        } else {
          console.log('User Creation failed');
          request.flash('danger', 'Something went wrong');
          response.redirect('/users/new');
        }
      } catch (error) {
        next(error);
      }
    }
  }
  //
};
module.exports = UsersController;
