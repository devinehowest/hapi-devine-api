const mongoose = require(`mongoose`);
const chalk = require(`chalk`);

const {flatten} = require(`lodash`);

const createAPI = require(`./lib/createAPI`);

const logRoute = ({path, method}) => {
  console.log(
    `  ${chalk.yellow(`${method}`)} -> ${chalk.cyan(`${path}`)}`
  );
};

module.exports.register = (server, options, next) => {

  const {
    log = true
  } = options;

  const r = Object.keys(mongoose.models).map(
    k => ({
      api: mongoose.models[k]._config.api,
      Model: mongoose.models[k]
    })
  ).filter(
    m => m.api
  ).map(
    m => ({
      routes: createAPI(m),
      name: m.Model.modelName
    })
  );

  if (log) console.log(``);

  if (log) {

    r.forEach(r => {

      console.log(`${chalk.yellow(`hapi-devine-api`)}: registered routes for ${chalk.cyan(`'${r.name}'`)} model:`);
      if (r.routes.length > 0) {
        if (log) console.log(``);
        r.routes.forEach(logRoute);
      }

    });


  }

  if (log) console.log(``);

  const routes = flatten(r.map(r => r.routes));
  server.route(routes);

  next();

};

module.exports.register.attributes = {
  pkg: require(`./package.json`)
};
