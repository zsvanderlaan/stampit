import slice from './utilities/slice';
import {assign} from './compose/merge';
import {baseStampit} from './baseStampit';
import {baseImplementation, BaseImplementation} from './descriptor/baseImplementation';
import {Factory} from "./compose/createFactory";
import {Composable} from "./compose/composable";

// a stamp is a generic type.
// this will need to be widened so that
// let stamp: Stamp<ResultType> = compose<ResultType>(composable1: Composable, composable2: Composable)
export interface Stamp extends Factory, BaseImplementation { }

export interface CompositionResult<C1, C2> { }

export interface Stampit<
  TRESULT extends CompositionResult<TCOMPOSABLE, TCOMPOSABLE>
  , C1
  , C2
  , TCOMPOSABLE extends Composable<C1>
  , TCOMPOSABLE extends Composable<C2>
  > {
  (composable1: TCOMPOSABLE, composable2: TCOMPOSABLE): Stamp<TRESULT>
}

function stampit(): Stamp {
  return baseStampit.compose.apply(baseStampit, slice.call(arguments));
}

export default assign(stampit, baseImplementation);



















































// a stamp is a generic type.
// this will need to be widened so that
// let stamp: Stamp<ResultType> = compose<ResultType>(composable1: Composable, composable2: Composable)
export interface Stamp<TRESULT> {
  (): TRESULT;
}

export interface Composable<T> { }


export interface CompositionResult<
  TRESULT extends C1 & C2
  , C1 extends Composable<C1>
  , C2 extends Composable<C2>
  > {

}

export interface Foo extends Composable<Foo> { }
export interface Boo extends Composable<Boo> { isNumber(): boolean; }
export interface Poo extends Foo, Boo { }
export interface Doo extends CompositionResult<Poo, Foo, Boo> { }

export interface Stampit<
  TRESULT extends C1 & C2
  , C1 extends Composable<C1>
  , C2 extends Composable<C2>
  > {
  (composable1: C1, composable2: C2): Stamp<TRESULT>
}

function stampit<
  TRESULT extends C1 & C2
  , C1 extends Composable<C1>
  , C2 extends Composable<C2>
  >(composable1: C1, composable2: C2): Stamp<TRESULT> {
  return undefined;
  //return baseStampit.compose.apply(baseStampit, slice.call(arguments));
}

let concreteStamper: Stampit<Poo, Foo, Boo> = stampit;
let foo: Foo = {};
let boo = { isNumber: function (): boolean { return false;  }};
let resultStamp: Stamp<Poo> = concreteStamper(foo, boo);
let resultInstance: Poo = resultStamp();
resultInstance.isNumber();
