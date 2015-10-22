import { readFile } from 'fs';
import { resolve } from 'path';
import { RouteBuilder } from 'hapi-route-builder';
const dataPath = resolve(__dirname, '../../data/settings.json');

module.exports = function(server, go) {
  const config = new RouteBuilder()
    .get('/api/settings', (request, reply) => {
      readFile(dataPath, 'utf8', (err, data) => {
        // delay response to leave loading in place
        // for a few seconds
        setTimeout( () => {
          reply(data);
        }, 3000);
      });
    })
    .build();
  server.route(config);
  go();
};