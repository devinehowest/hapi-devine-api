const Boom = require(`boom`);

module.exports = ({Model, config}) => {

  const {modelName} = config;

  return (req, res) => {

    const {_id} = req.params; // _id from route

    // hard / soft delete, default: hard: false
    const {hard} = req.query;

    if (hard) {

      // hard delete
      // remove entry in collection

      Model.remove({_id})
        .then(() => res().code(204)) // CODE: 204 => NO CONTENT
        .catch(err => res(
          Boom.badRequest(err.message) // mongoose, mongodb error (400)
        ));

    } else {

      // soft delete (DEFAULT)
      // update isActive => false

      Model.update({_id}, {isActive: false}, {upsert: true})
        .then(d => {

          if (d.ok) return res().code(204); // CODE: 204 => NO CONTENT

          else return res(
            Boom.badRequest(`error while deleting ${modelName} with _id ${_id}`)
          );

        })
        .catch(err => res(
          Boom.badRequest(err.message) // mongoose, mongodb error (400)
        ));

    }

  };

};
