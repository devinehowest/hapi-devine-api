const Boom = require(`boom`);
const {omit, pick} = require(`lodash`);

const getFullUrl = require(`../getFullUrl`);

module.exports = ({Model, config}) => {

  const {fields, modelName, projection, route} = config;

  return (req, res) => {

    const payload = pick(req.payload, fields.input);

    // create new instance of model (with payload as data)
    const model = new Model(payload);

    // insert model
    model.save()
      .then(d => {

        if (!d) return res( // insert failed
          Boom.badRequest(`cannot save ${modelName}`)
        );

        // no projection on save, manual via omit
        d = omit(
          d.toJSON(),
          projection.map(p => p.startsWith(`-`) ? p.slice(1) : p) // projection without ('-')
        );

        return (
          res(d) // result
            .header(`Location`, getFullUrl(`${route}/${d._id}`)) // LOCATION HEADER
            .code(201) // code: 201 => CREATED
        );

      })
      .catch(err => res(
        Boom.badRequest(err.message) // mongoose, mongodb errors
      ));

  };

};
