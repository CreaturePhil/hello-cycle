import Rx from 'rx';
import Cycle from '@cycle/core';
import {makeDOMDriver, label, input, h1, hr, div} from '@cycle/dom';

function main() {
  return {
    DOM: Rx.Observable.of(
      div('hello world!')
    )
  };
}

const drivers = {
  DOM: makeDOMDriver('#app')
};

Cycle.run(main, drivers);
