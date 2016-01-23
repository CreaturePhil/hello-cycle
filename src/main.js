import Rx from 'rx';
import Cycle from '@cycle/core';
import {makeDOMDriver, label, input, h1, hr, div} from '@cycle/dom';

function main(sources) {
  const inputEv$ = sources.DOM.select('.field').events('input');
  const name$ = inputEv$.map(ev => ev.target.value).startWith('World');
  return {
    DOM: name$.map(name =>
      Rx.Observable.of(
        div([
          label('Name:'),
          input('.field', {type: 'text', value: name}),
          hr(),
          h1(`Hello ${name}!`)
        ])
      )
    )
  };
}

const drivers = {
  DOM: makeDOMDriver('#app')
};

Cycle.run(main, drivers);
