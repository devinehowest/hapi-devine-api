const Boom = require(`boom`);

module.exports = ({Model, config}) => {

  const {projection, modelName} = config;

  return (req, res) => {

    const {_id} = req.params; // _id from route

    const filter = {_id}; // select by _id

    Model.findOne(
      filter,
      projection.join(` `) // projection
    )
    .then(d => {

      // no data -> CODE: 404 => NOT FOUND
      if (!d) return res(
        Boom.notFound(`${modelName} with _id ${_id} does not exist`)
      );

      return res(
        d // data
      ); // CODE: 200 =>  OK

    })
    .catch(err => res(
      Boom.badRequest(err.message)) // mongoose, mongodb errors (400)
    );

  };

};
