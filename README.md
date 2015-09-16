# react-playground

## Running

### Run lint outside of build
`npm run lint`

### Build
`npm run build`

### Run Dev server
`npm run watch-client`

## TODOs

### Webpack/Hapi
- hapi
- isomorphic, allow application to be rendered on the server
- prod builds in webpack

### React/Redux
- redux-thunk, allow for async control flow
- react-router, route for react
- redux-react-router, redux bindings, keep router state in redux?
- redux dev tools, tools for state mgmt in new window
- redux-form, manage forms/validation
- reselect, memoized selectors, compute derived data, limit transforms
- normalizr, for solving complex data structures with schemas

### Future immutable work
- redux-actions, Flux Standard Action utilities for Redux.
  - want to move toward https://github.com/acdlite/flux-standard-action and redux-actions has good support
- seamless-immutable, better immutable as ImmutableJS isn't purely immutable, can still do bad things: http://noredinktech.tumblr.com/post/107617838018/switching-from-immutablejs-to-seamless-immutable
- Immutability discussion: https://github.com/rackt/redux/issues/548
- Look into mori

## Details

### Action Object Standards

With `3.0` of redux, your `Action`s need to have a `type`.  The use of [redux-immutablejs](https://github.com/indexiatech/redux-immutablejs) further enforces this.

There are also several ways to encapsulate the data that travels with the action.

[One is to use `payload`](https://github.com/acdlite/flux-standard-action#example)
```javascript
{
  type: 'ADD_TODO',
  payload: {
    text: 'Do something.'  
  }
}
```

[Another uses `data`](https://github.com/gajus/redux-immutable-examples/blob/d854d9e0a9df23b5ce2d10573ba2c9eb7308c3c8/src/app/actions/index.js#L5-L10)
```javascript
{
  type: 'ADD_TODO',
  data: {
    text: 'Do something.'
  }
}
```

And the redux docs themselves prefer to [not encapsulate the data at all](https://github.com/rackt/redux/blob/c1200540528eabaab3e98b4c47af9cb5ec4cd368/examples/todomvc/actions/todos.js)
```javascript
{
  type: 'ADD_TODO',
  text: 'Do something.'
}
```

This repo uses the `payload` standard from [Flux Action Standard](https://github.com/acdlite/flux-standard-action).

### Immutability and ImmutableJS
Redux places a huge impetus on immutable data. Any time state transformation occurs, existing state cannot be mutated. To fully realize the power of Redux, this should be taken seriously. Not mutating state can get tricky when dealing with nested data structures.

Imagine a list of 10 TODOs. Lets say you need to mark a TODO as complete.

```javascript
state.todos[action.index].completed = true;
return state;
```

Double fail. This code both manipulates the existing TODO object and returns the existing TODO array.  Lets try again.

```javascript
state.todos[action.index] = {
  ...state.todos[action.index],
  completed: true
}
return state;
```

Less fail, but still not right. This code now creates a new object for the todo that is being updated, but it returns the same array. The object has not been mutated, but the array has.

Note the use of the [https://github.com/sebmarkbage/ecmascript-rest-spread](object spread syntax) which is a proposal for ES7 (and is transpilable via Babel). It allows existing object structure to be populated into the new object along with any overrides (in this case `completed`).

So lets see if we can get this right.

Example borrowed from the [Redux documentation](http://rackt.github.io/redux/docs/basics/Reducers.html).
```javascript
return [
  ...state.todos.slice(0, action.index),
  Object.assign({}, state.todos[action.index], {
    completed: true
  }),
  ...state.todos.slice(action.index + 1)
]
```

Here we use the ES7 Object Spread again, grabbing all the items in the array before and after the one indicated by the `action.index` and populating them into a new array.  We use [`Object.assign`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign), introduced with ES6, to create a new version of the TODO that needs updating, and assign `completed` to true.

That'll do it! But ugh. Despite the brilliance of the new ES6/7 features, we're still left with some ugly code.

Enter [Immutable.js](https://github.com/facebook/immutable-js/), a Facebook project that makes working immutable data structures cleaner.

```javascript
state.todos = state.todos.update(action.index, item =>
  item.set("completed", false));
return state;
```

This code presumes that `state.todos` is already an immutablejs `List` of `Map`s. `update` will return a new `List`. `item.set` returns a new todo (not a mutated old todo) which replaces the todo at the given index.

Note:

ImmutableJS isn't deeply immutable. If the item you place inside an Immutable structure is itself mutable, then it can be mutated.  Example:

```javascript
var obj = {foo: "original"};
var notFullyImmutable = Immutable.List.of(obj);

notFullyImmutable.get(0) // { foo: 'original' }

obj.foo = "mutated!";

notFullyImmutable.get(0) // { foo: 'mutated!' }
```

If all Immutable structures are created with `fromJS` then this isn't an issue.

Immutable.js Issues tracking problem:
- https://github.com/facebook/immutable-js/issues/546
- https://github.com/facebook/immutable-js/issues/473

### redux-immutablejs

[redux-immutablejs](https://github.com/indexiatech/redux-immutablejs) provides two major features.

First, it enforces the need for Immutable.js objects being returned from Redux reducers.  If you return an object that isn't from Immutable you'll get an error: `Uncaught TypeError: Reducers must return Immutable objects.`

Second, it provides a `createReducer` function that allows you to use a handler map instead of a `switch` statement.

So this:

```javascript
function construct() {
  return Immutable.fromJS({
    amount: 1,
    value: 0
  });
}

export default function(state = construct(), action) {
  switch (action.type) {
  case INCREMENT_TIME:
    return state.update('value', v => v + state.get('amount'));
  case DECREMENT_TIME:
    return state.update('value', v => v - state.get('amount'));
  case NEW_AMOUNT:
    return state.set('amount', action.amount);
  default:
    return state;
  }
}
```

Turns into this:
```javascript
const initialState = Immutable.fromJS({
  amount: 1,
  value: 0
});

export default createReducer(initialState, {
  [INCREMENT_TIME]: (state) =>
    state.update('value', v => v + state.get('amount')),
  [DECREMENT_TIME]: (state) =>
    state.update('value', v => v - state.get('amount')),
  [NEW_AMOUNT]: (state, action) =>
    state.set('amount', action.amount)
});
```

Note: redux-immutablejs expects your actions to have a `type` in order to match them to the handler map.  This shouldn't be an issue as with version `3.0` redux expects a `type` as well.




