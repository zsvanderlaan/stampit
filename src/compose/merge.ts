import isObject from '../utilities/isObject';
import slice from '../utilities/slice';

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

// the spread operator for args may result in slice.call(args, 1) to be incorrect
// todo: research and consider changing to slice.call(args, 0) for assign() and merge()

export function assign(dst, ...args: Array<any>) {
  return mergeFew(dst, slice.call(args, 1), true);
}

export function merge(dst, ...args: Array<any>) {
  return mergeFew(dst, slice.call(args, 1), false);
}
