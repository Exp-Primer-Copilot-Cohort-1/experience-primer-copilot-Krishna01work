// create web server
// 1. load modules
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
// 2. create web server
var server = http.createServer(function(request,response){
    // 2.1 get url
    var parsedUrl = url.parse(request.url);
    var resource = parsedUrl.pathname;
    console.log('resource='+resource);
    // 2.2 get query string as object
    var query = qs.parse(parsedUrl.query);
    console.log('query='+JSON.stringify(query));
    // 2.3 routing
    if(resource == '/'){
        fs.readFile('index.html','utf-8',function(error,data){
            if(error){
                response.writeHead(500,{'Content-Type':'text/html'});
                response.end('500 Internal Server '+error);
            }else{
                response.writeHead(200,{'Content-Type':'text/html'});
                response.end(data);
            }
        });
    }else if(resource == '/comments'){
        if(request.method == 'GET'){
            response.writeHead(200,{'Content-Type':'text/html'});
            response.end(JSON.stringify(query));
        }else if(request.method == 'POST'){
            var body = '';
            request.on('data',function(data){
                body += data;
            });
            request.on('end',function(){
                var post = qs.parse(body);
                console.log('post='+JSON.stringify(post));
                response.writeHead(200,{'Content-Type':'text/html'});
                response.end(JSON.stringify(post));
            });
        }
    }else{
        response.writeHead(404,{'Content-Type':'text/html'});
        response.end('404 Page Not Found');
    }
});
// 3. start server
server.listen(80,function(){
    console.log('Server running at http://
    