export default (undefined !== (<any>Object).values) ? (<any>Object).values : function values(obj: Object) {
  return Object.keys(obj).map(k => obj[k]);
};
