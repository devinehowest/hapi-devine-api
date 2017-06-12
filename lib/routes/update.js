const {pick} = require(`lodash`);
const Boom = require(`boom`);

module.exports = ({Model, config}) => {

  const {fields, projection, modelName} = config;

  return (req, res) => {

    const {_id} = req.params; // _id from route

    const payload = pick(req.payload, fields.input); // clean payload data

    Model.update({_id}, payload) // automatically changes updated field
      .then(d => {

        if (d.ok) { // update success?

          // const filter = {_id, isActive: true}; // USER
          const filter = {_id};

          Model.findOne(
            filter,
            projection.join(` `)
          )
          .then(d => {

            if (!d) return res( // error on update
              Boom.notFound(`${modelName} does not exist`)
            );

            return res(d); // CODE: 200 => OK

          })
          .catch(err => res( // mongoose, mongodb errors (400)
            Boom.badRequest(err.message)
          ));

        } else return res( // update failed
          Boom.badRequest(`error while updating ${modelName} with _id ${_id}`)
        );

      })
      .catch(err => res(
        Boom.badRequest(err.message) // mongoose, mongodb errors (400)
      ));

  };
};
