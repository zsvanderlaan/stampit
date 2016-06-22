interface ObjectConstructorWithValues { values: Array<any> }

export default isObjectConstructorES2017(Object) ? Object.values : function values(obj) {
  return Object.keys(obj).map(k => obj[k]);
};

function isObjectConstructorES2017(target: ObjectConstructor | (ObjectConstructor & ObjectConstructorWithValues))
  : target is ObjectConstructor & ObjectConstructorWithValues {
  return (<ObjectConstructorWithValues>target).values !== undefined;
}