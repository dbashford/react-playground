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
- react-router, route for react
- redux-react-router, redux bindings, keep router state in redux?
- redux dev tools, tools for state mgmt in new window
- immutablejs, immutable data structures, force use of immutable structures in stores
- redux-form, manage forms/validation
- reselect, memoized selectors, compute derived data, limit transforms
- normalizr, for solving complex data structures with schemas
- redux-actions, Flux Standard Action utilities for Redux.
- redux-immutable, bindings to immutable, replaces `combineReducers`
- data in payload: https://github.com/acdlite/flux-standard-action#payload
- Replace
```javascript
[
  ...state.todos.slice(0, action.index),
  Object.assign({}, state.todos[action.index], {
    completed: true
  }),
  ...state.todos.slice(action.index + 1)
]
```
with immutablejs or updeep or react addon https://facebook.github.io/react/docs/update.html

### Resources
- https://github.com/gajus/canonical-reducer-composition
