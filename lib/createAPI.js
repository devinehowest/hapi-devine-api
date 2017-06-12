const parseMethods = require(`./parseMethods`);

module.exports = ({
  api = {},
  Model
}) => {

  const {
    include = false,
    exclude = false
  } = api;

  const config = require(`hapi-devine-api-config`)(Model);
  const {route, validation} = config;

  return parseMethods(include, exclude).map(

    ({

      method,
      func,
      id = true,
      rename = false

    }) => ({

      method: rename ? rename : method,
      path: `${route}${id ? `/{_id}` : ``}`,

      handler: require(`./routes/${func}`)({Model, config}),

      config: {
        validate: validation[method]
      }

    })

  );


};
