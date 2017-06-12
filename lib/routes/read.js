const parseQuery = require(`hapi-devine-parse-query`);
const Boom = require(`boom`);

module.exports = ({Model, config}) => {

  const {projection, collectionName} = config;

  return (req, res) => {

    // parse querystrings (filtering, fields, sorting etc...)
    parseQuery(Model, req.query)
      .then(({sort, skip, limit, fields: f, meta, filter}) => {

        Model.find(
          filter, // filter = empty as default
          f ? f : projection.join(` `), // projection (manual add fields)
          {sort, skip, limit} // sorting + pagination
        )
        .then(d => {

          return res({
            [collectionName]: d, // in example. users: [{...}, {...}, etc]
            meta // meta data on GET (total, page (per_page, total, current))
          }); // CODE: 200 => OK

        });

      })
      .catch(err => res(
        Boom.badRequest(err.message) // mongoose, mongodb errors (400)
      ));

  };

};
