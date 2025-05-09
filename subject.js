const http = require('http');

const server = http.createServer(function(req, res){
    res.setHeader('Access-Control-Allow-Origin' , '*');
    res.setHeader('Access-Control-Allow-Method' , 'GET , POST');
    res.setHeader('Access-Control-Allow-Header' , 'Content-Type');

    res.writeHead(200, {'Content-Type' : 'text/json'});
    res.write('{"contactSubject": ["General Enquiry", "Class", "Schedule", "Instructor", "Price","Location" ,"Other"]}');
    res.end();

});

server.listen(4040)