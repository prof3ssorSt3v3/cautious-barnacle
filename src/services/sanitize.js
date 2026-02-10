import xss from 'xss';

//sanitize things for POST and PUT
const sanitize = (req, res, next) => {
  // req.body already exists
  //we will create req.sanitizedBody
  const { id, _id, squid, ...attributes } = req.body;
  // attributes is the list of things that we DO want to sanitize

  for (const key in attributes) {
    attributes[key] = xss(attributes[key], {
      whiteList: [], // empty, means filter out all tags
      stripIgnoreTag: true, // filter out all HTML not in the whitelist
      stripIgnoreTagBody: ['script', 'style'],
      // the script tag is a special case, we need
      // to filter out its content
    });
  }
  next();
};

export { sanitize };
