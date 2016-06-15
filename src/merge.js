import isObject from './isObject';
import slice from './slice';
import {mergeMethodStrategy} from "./mergeMethodStrategy";

function mergeOne(dst, src, shallow) {
  if (src === undefined) return dst;
  const srcIdObject = isObject(src);
  if (!srcIdObject) return src; // not a POJO, array, or function

  const dstIsArray = Array.isArray(dst);
  const srcIsArray = Array.isArray(src);
  if (srcIsArray) return (dstIsArray ? dst : []).concat(src);

  if (shallow === undefined) shallow = false;
  if (dstIsArray) return mergeOne({}, src, shallow);

  const keys = Object.keys(src);
  if (!dst) dst = {};

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const srcValue = src[key];
    if (srcValue === undefined) continue;

    dst[key] = shallow ? src[key] : mergeOne(dst[key], srcValue, shallow);
  }

  return dst;
}

function mergeFew(dst, srcs, shallow) {
  return srcs.reduce((target, src) => mergeOne(target, src, shallow), dst);
}

export function assign(dst) {
  return mergeFew(dst, slice.call(arguments, 1), true);
}

export function merge(dst) {
  return mergeFew(dst, slice.call(arguments, 1), false);
}

export function mergeMethods(targetMethods, sourceMethods, customStrategies) {

  const methods = [];

  Object.keys(sourceMethods).forEach((key) => {
    switch (customStrategies[key]) {
      case mergeMethodStrategy.WRAP:
        methods.push(function () {
          targetMethods[key] && targetMethods[key].apply(this, arguments);
          sourceMethods[key].apply(this, arguments);
        });
        break;
      case mergeMethodStrategy.WRAP_MERGE:
        methods.push(function () {
          const returnValue1 = targetMethods[key] && targetMethods[key].apply(this, arguments);
          const returnValue2 = sourceMethods[key].apply(this, arguments);

          return returnValue1 ? assign(returnValue1, returnValue2) : returnValue2;
        });
        break;
      case mergeMethodStrategy.WRAP_OR:
        methods.push(function () {
          const returnValue1 = targetMethods[key] && targetMethods[key].apply(this, arguments);
          const returnValue2 = sourceMethods[key].apply(this, arguments);

          return returnValue1 || returnValue2;
        });
        break;
      case mergeMethodStrategy.OVERRIDE:
      default:
        methods.push(sourceMethods[key]);
        break;
    }
  });
  return assign(targetMethods, methods);
}