import {Server} from "hapi";
import inert from "inert";

const host = process.env.HOSTNAME || "localhost";
const port = process.env.PORT || 8000;

let initialState = {
  count: 0,
  settings: {
    amount: 1,
    interval: 1000,
    increment: true
  }
};

const server = new Server();
server.connection({host, port});

server.register([inert], (err) => {
  if (err) {
    throw err;
  }

  server.start( () => {
    console.info("==> ✅  Server is listening");
    console.info("==> 🌎  Go to " + server.info.uri.toLowerCase());
  });
});

server.route({
  method: "GET",
  path: "/{params*}",
  handler: {
    directory: {
      path: 'static',
      index: true
    }
  }
});
