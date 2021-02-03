const http = require('http');
const url = require('url');
const services = require('./services');
const jsonBody = require('body/json');

const server = http.createServer();
//    key:
//    cert:
//);

server.on('request',function(req,res){
    const parsedurl =  url.parse(req.url, true);
    console.log(req.url, parsedurl.pathname,req.method);
    if (req.method ==='GET' && parsedurl.pathname === '/metadata'){
        const {id} = parsedurl.query;
        const metadata = services.fetchImageMetadata(id);
        res.setHeader('Content-Type','application/json');
        req.statusCode =200;
        const searializedJSON = JSON.stringify(metadata);
        res.write(searializedJSON);
        res.end();
        console.log(metadata);
        console.log (req.headers);
    };
    //console.log(parsedurl);
    jsonBody(req,res,(err,body)=>{
        if(err){
            console.log(err);
        } else{
            services.createUser(body.userName);
        }
        
    })
    //res.statusCode =201;
   // res.writeHead(200,{
    //    'Content-Type':'application/json'
    //})
    //res.end('this is the end');
    
  /*
  const body= [];
    req.on('data',(chunk)=>{
        console.log('i am here');
        body.push(chunk);
        console.log(body);
    }).on('end',()=>{
        console.log('i am at the end here');
        console.log(req);
        //const parsedJSON = JSON.parse(Buffer.concat(body));
        //const userName = parsedJSON[0]['userName'];
        //console.log(userName);

    });
    */
});

server.listen(3000);