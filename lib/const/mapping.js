module.exports = [

  {
    method: `GET`,
    func: `read`,
    id: false
  },
  {
    method: `GET_ONE`,
    rename: `GET`,
    func: `readOne`,
  },

  {
    method: `POST`,
    func: `create`,
    id: false
  },

  {
    method: `PATCH`,
    func: `update`
  },
  {
    method: `PUT`,
    func: `update`,
  },

  {
    method: `DELETE`,
    func: `delete`
  }

];
