import { readFile } from 'fs';
import { join as pathJoin } from 'path';
import { RouteBuilder } from 'hapi-route-builder';
const dataPath = pathJoin(__dirname, '..', 'data', 'settings.json');

module.exports = function(server, go) {
  const config = new RouteBuilder()
    .get('/api/settings', (request, reply) => {
      readFile(dataPath, 'utf8', (err, data) => {
        reply(data);
      });
    })
    .build();
  server.route(config);
  go();
};