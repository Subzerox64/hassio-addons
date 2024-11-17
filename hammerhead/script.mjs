import express from "express";
import { createServer } from "node:http";
import { createRammerhead, shouldRouteRh, routeRhUpgrade, routeRhRequest } from '@rubynetwork/rammerhead';

const app = express();
const server = createServer();
const rh = rammerhead.createRammerhead({
    logLevel: 'debug', //Options are: disabled, debug, traffic, info, warn, error (default: debug)
    reverseProxy: false, //whether or not this server is running behind a reverse proxy (default: false)
    disableLocalStorageSync: false, //disable localstorage sync (not recommended) (default: false)
    disableHttp2: false //disable http2 usage (default: false) (NOT RECOMMENDED)
})

server.on("request", (req, res) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  if (shouldRouteRh(req)) {
    routeRhRequest(rh /* from the createRammerhead function MUST be passed */, req, res)
  }
  else {
    app(req, res);
  }
});
server.on("upgrade", (req, socket, head) => {    
    if (rammerhead.shouldRouteRh(req)) {
        rammerhead.routeRhUpgrade(rh /* from the createRammerhead funtion MUST be passed */, req, socket, head)
    }
    else {
        socket.end()
    }
});

server.on("listening", () => {
  console.log("Listening on: http://localhost:8080");
});

server.listen({port: 8080});
