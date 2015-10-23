import fetch from 'isomorphic-fetch';
// import { BEGIN, COMMIT, REVERT } from 'redux-optimist';

export const UPDATE_COUNT = 'UPDATE_COUNT';
export const SET_SETTINGS = 'SET_SETTINGS';
export const INITIALIZE = 'INITIALIZE';

export function updateCount() {
  return {
    type: UPDATE_COUNT
  };
}

export function setSettings(settings) {
  fetch('/api/settings', {
    method: 'PUT',
    body: JSON.stringify(settings),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });

  return {
    type: SET_SETTINGS,
    payload: settings
  };
}

export function initializeState(state) {
  return {
    type: INITIALIZE,
    payload: state
  };
}

// function fetchPosts(reddit) {
//   return dispatch => {
//     dispatch(requestPosts(reddit));
//     return fetch(`http://www.reddit.com/r/${reddit}.json`)
//       .then(response => response.json())
//       .then(json => dispatch(receivePosts(reddit, json)));
//   };
// }

export function initializeApp(dispatch, done) {
  fetch('/api/settings')
    .then( (response) => {
      if (response.status >= 400) {
        throw new Error('Bad response from server');
      }
      return response.json();
    })
    .then( (settings) => {
      dispatch(initializeState(settings));
      done();
    });
}
