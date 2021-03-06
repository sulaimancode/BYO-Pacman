var http = require('http');
var url = require('url');
var ecstatic = require('ecstatic')({ root: __dirname + '/app/public' });

function start(route, handle) {

  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log('request for  ' + pathname + ' received!'); // eslint-disable-line
    if ( pathname.substring(0, 4) == '/js/' ||
         pathname.substring(0, 5) == '/css/' ||
         pathname.substring(0, 5) == '/img/' ||
         pathname == '/favicon.ico'){
      ecstatic(request, response);
    } else {
      route(handle, pathname, response);
    }
  }

  var server = http.createServer(onRequest);
  var port = process.env.PORT || 3000;
  server.listen(port, function() {
      console.log("App is running on port " + port);// eslint-disable-line
  });
}

exports.start = start;
