const User = require('./UserModel');

exports.params = (req, res, next, id) => {
  User.findById(id)
    .then((user) => {
      if (!user) {
        next(new Error(`No user with id ${id}`));
      } else {
        req.user = user;
        next();
      }
    }, (err) => next(err));
};

exports.post = (req, res, next) => {
  const newUser = req.body;
  User.create(newUser)
    .then((user) => res.json(user),
  (err) => next(err));
};

exports.delete = (req, res, next) => {
  req.user.remove((err, removed) => {
    if (err) {
      next(err);
    } else {
      res.json(removed);
    }
  });
};
