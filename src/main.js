import Rx from 'rx';
import Cycle from '@cycle/core';
import {makeDOMDriver, div, input, ul, li} from '@cycle/dom';

function main(sources) {
  const enterEvent$ = sources.DOM
    .select('input')
    .events('keyup')
    .filter(e => e.keyCode === 13)
    .map(e => e.target.value)
    .scan((prev, cur) => prev.concat(cur), [])
    .startWith([]);

  return {
    DOM: enterEvent$.map(messages =>
      div([
        input({type: 'text', value: ''}),
        ul([
          messages.map(m => li(m))
        ])
      ])
    )
  };
}

const drivers = {
  DOM: makeDOMDriver('#app')
};

Cycle.run(main, drivers);
