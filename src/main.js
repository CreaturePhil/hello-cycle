import Rx from 'rx';
import Cycle from '@cycle/core';
import {makeDOMDriver, div, input, label, h2} from '@cycle/dom';

function intent(DOMSource) {
  const changeWeight$ = DOMSource.select('.weight').events('input')
    .map(ev => ev.target.value);

  const changeHeight$ = DOMSource.select('.height').events('input')
    .map(ev => ev.target.value);

  return {changeWeight$, changeHeight$};
}

function model(changeWeight$, changeHeight$) {
  const state$ = Rx.Observable.combineLatest(
    changeWeight$.startWith(70),
    changeHeight$.startWith(170),
    (weight, height) => {
      const heightMeters = height * 0.01;
      const bmi = Math.round(weight / (heightMeters * heightMeters));
      return {bmi, weight, height};
    }
  );

  return state$;
}

function view(state$) {
  const vtree$ = state$.map(state =>
    div([
      div([
        label(`Weight: ${state.weight}kg`),
        input('.weight', {type: 'range', min: 40, max: 150, value: state.weight})
      ]),
      div([
        label(`Height: ${state.height}cm`),
        input('.height', {type: 'range', min: 140, max: 220, value: state.height})
      ]),
      h2(`BMI is ${state.bmi}`)
    ])
  );

  return vtree$;
}

function main(sources) {
  const {changeWeight$, changeHeight$} = intent(sources.DOM);
  const state$ = model(changeWeight$, changeHeight$);
  const vtree$ = view(state$);

  return {
    DOM: vtree$
  };
}

const drivers = {
  DOM: makeDOMDriver('#app')
};

Cycle.run(main, drivers);
