const bcrypt = require('bcrypt');
const kx = require('../db/connection');

const SessionsController = {
  new(request, response, next) {
    response.render('sessions/new');
  },
  async create(request, response, next) {
    const { email, password } = request.body;
    const companyId = request.app.locals.currentCompany;

    console.log(`Email: ${email} Password:${password}`);
    console.log(`companyId from Session: ${companyId} `);
    try {
      const user = await kx
        .first('users.id', 'users.passwordDigest', 'user_roles.role_name')
        .from('users')
        .leftJoin('user_company', 'users.id', 'user_company.users_id')
        .leftJoin(
          'user_roles',
          'user_company.roles_id',
          'user_roles.user_roles_id'
        )
        .where('users.email', email)
        .andWhere('user_company.company_id', companyId);
      console.log('User ID from DB: ' + user.id);
      console.log('User Role from DB: ' + user.role_name);
      console.log(
        `Pwd Compare Result:${await bcrypt.compare(
          password,
          user.passwordDigest
        )}`
      );
      if (user && (await bcrypt.compare(password, user.passwordDigest))) {
        request.session.userId = user.id;
        request.session.userRole = user.role_name;
        // const userRole = await kx
        //   .select('role_name')
        //   .from('user_roles')
        //   .leftJoin(
        //     'user_company',
        //     'user_roles.user_roles_id',
        //     'user_company.roles_id'
        //   );

        console.log('User ID from session-Success: ' + request.session.userId);
        request.flash('success', 'Thank you for signing in!');
        // response.setHeader('Content-Type', 'text/html');
        // response.write(
        //   '<p>request.sessions.userId ' + request.session.userId + '</p>'
        // );
        // response.end();
        request.session.save(err => {
          response.redirect('/');
        });
      } else {
        request.flash('danger', 'Incorrect password or email');
        console.log('User ID from session-Fail: ' + request.session.userId);
        response.redirect('/session/new');
      }
    } catch (error) {
      console.log('Error Message from Session:' + error.message);
      next(error.message);
    }
  },
  destroy(request, response, next) {
    request.session.userId = null;
    request.session.userRole = null;
    request.flash('success', 'Logged out successfully!');
    request.session.save(err => {
      response.redirect('/');
    });
  }
};

module.exports = SessionsController;
