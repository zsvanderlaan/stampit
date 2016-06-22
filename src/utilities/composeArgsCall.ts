import compose from '../compose/compose';
import slice from './slice';

export function composeArgsCall(self, propName, action, args) {
    const descriptor = {};
    descriptor[propName] = action.apply(null, [{}].concat(slice.call(args)));
    return (self.compose || compose).call(self, descriptor);
}