export const UPDATE_COUNT = 'UPDATE_COUNT';
export const SET_SETTINGS = 'SET_SETTINGS';

export function updateCount() {
  return {
    type: UPDATE_COUNT
  };
}

export function setSettings(settings) {
  return {
    type: SET_SETTINGS,
    payload: settings
  };
}
