import isObject from './isObject';
import isFunction from './isFunction';
import slice from './slice';
import values from './values';

export function extractFunctions() {
    const functions = slice.call(arguments).reduce((result, arg) => {
        if (isFunction(arg)) {
            return result.concat(arg);
        }
        if (Array.isArray(arg)) {
            return result.concat(extractFunctions.apply(null, arg) || []);
        }
        if (isObject(arg)) {
            return result.concat(extractFunctions.apply(null, values(arg)) || []);
        }
        return result;
    }, []);
    return functions.length === 0 ? undefined : functions;
}