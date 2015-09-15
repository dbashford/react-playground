# react-playground

### Run lint outside of build
`npm run lint`

### Build
`npm run build`

### Run Dev server
`npm run watch-client`

### TODOs

##### Webpack/Hapi
- hapi
- isomorphic, allow application to be rendered on the server
- prod builds in webpack

##### React/Redux
- redux-immutablejs, bindings to immutable, replaces `combineReducers`
- redux-thunk, allow for async control flow
- react-router, route for react
- redux-react-router, redux bindings, keep router state in redux?
- redux dev tools, tools for state mgmt in new window
- redux-form, manage forms/validation
- reselect, memoized selectors, compute derived data, limit transforms
- normalizr, for solving complex data structures with schemas
- redux-actions, Flux Standard Action utilities for Redux.
- data in payload: https://github.com/acdlite/flux-standard-action#payload

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

### redux-immutablejs



