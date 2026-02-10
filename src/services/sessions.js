import session from 'express-session';

const setSession = (req, res, next) => {
  session({
    genid: function (req) {
      return crypto.randomUUID();
    },
    name: 'menu-session-id', //name of the session cookie
    secret: process.env.MY_SECRET,
    resave: false,
    cookie: { httpOnly: true, maxAge: 20 * 60 * 1000 }, //20 mins
  });

  next();
};
export { setSession };

const stupid = (req, res, next) => {
  //call this middleware after login
  req.session = {
    id: Math.random().toString(16),
  };
  //making sure to set a cookie with the session id
  //once they are authenticated
  res.cookie('stupid', req.session.id);
};
