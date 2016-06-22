import compose from '../compose/compose';
import slice from '../utilities/slice';
import {merge, assign} from '../compose/merge';
import {extractFunctions} from '../utilities/extractFunctions';
import {composeArgsCall} from '../utilities/composeArgsCall';

export const descriptorImplementation = {
    methods() {
        return composeArgsCall(this, 'methods', assign, arguments);
    },
    properties() {
        return composeArgsCall(this, 'properties', assign, arguments);
    },
    initializers() {
        return (this.compose || compose).call(this, {
            initializers: extractFunctions.apply(null, slice.call(arguments))
        });
    },
    deepProperties() {
        return composeArgsCall(this, 'deepProperties', merge, arguments);
    },
    staticProperties() {
        return composeArgsCall(this, 'staticProperties', assign, arguments);
    },
    staticDeepProperties() {
        return composeArgsCall(this, 'staticDeepProperties', merge, arguments);
    },
    configuration() {
        return composeArgsCall(this, 'configuration', assign, arguments);
    },
    deepConfiguration() {
        return composeArgsCall(this, 'deepConfiguration', merge, arguments);
    }
};