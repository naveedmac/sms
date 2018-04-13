const GreetingsController = {
  index(request, response, next) {
    response.render('greetings/home');
  },

  admin(request, response, next) {
    response.render('greetings/admin');
  }
};
module.exports = GreetingsController;
