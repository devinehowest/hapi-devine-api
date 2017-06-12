module.exports = suffix => {

  const {
    URL = `http://localhost`,
    PORT = 3000
  } = process.env;

  const isDevelopment = (URL === `http://localhost`);

  return `${URL}${isDevelopment ? `:${PORT}` : ``}${suffix}`;

};
