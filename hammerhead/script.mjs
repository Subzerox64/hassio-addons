import http from 'node:http';
import { createRammerhead, shouldRouteRh, routeRhUpgrade, routeRhRequest } from '@rubynetwork/rammerhead';

const rh = createRammerhead({
    logLevel: 'debug', //Options are: disabled, debug, traffic, info, warn, error (default: debug)
    reverseProxy: false, //whether or not this server is running behind a reverse proxy (default: false)
    disableLocalStorageSync: false, //disable localstorage sync (not recommended) (default: false)
    disableHttp2: false //disable http2 usage (default: false) (NOT RECOMMENDED)
})

const server = http.createServer();
server.on('request', (req, res) => {
    if (shouldRouteRh(req)) {
        routeRhRequest(rh /* from the createRammerhead function MUST be passed */, req, res)
    }
})
server.on('upgrade', (req, socket, head) => {
    if (shouldRouteRh(req)) {
        routeRhUpgrade(rh /* from the createRammerhead funtion MUST be passed */, req, socket, head)
    }
})
server.listen({host: '0.0.0.0', port: 8080}, () => {
    console.log('Server is listening on port 8080!');
})
