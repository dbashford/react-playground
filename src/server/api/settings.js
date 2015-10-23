import { RouteBuilder } from 'hapi-route-builder';
let state = require('../data/settings.json');

const get = function() {
  return new RouteBuilder()
    .get('/api/settings', (request, reply) => {
      setTimeout( () => {
        reply(state);
      }, 2000);
    })
    .build();
};

const put = function() {
  return new RouteBuilder()
    .put('/api/settings', (request, reply) => {
      state.settings = request.payload;
      setTimeout( () => {
        reply().code(204);
      }, 2000);
    })
    .build();
};

module.exports = function(server, go) {
  server.route(get());
  server.route(put());
};