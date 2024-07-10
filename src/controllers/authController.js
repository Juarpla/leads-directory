const authCont = {};

authCont.login = (req, res) => {
  //#swagger.ignore = true
};

authCont.thirdPartyAuth = (req, res) => {
  //#swagger.ignore = true
  req.session.user = req.user;
  res.redirect("/");
};

authCont.logout = function (req, res, next) {
  //#swagger.tags=["Auth"]
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

module.exports = authCont;