const methods = require(`./const/mapping`);

module.exports = (include = false, exclude = false) => {

  if (include) {
    return methods.filter(o => include.includes(o.method));
  } else if (exclude) {
    return methods.filter(o => !exclude.includes(o.method));
  }

  return methods;

};
