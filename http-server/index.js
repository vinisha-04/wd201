const http = require("http");
const fs = require("fs");

let homeContent = "";
let projectContent = "";
let registrationContent = "";

const args = require("minimist")(process.argv.slice(2));
console.log(args);

fs.readFile("home.html", (err, home) => {
  if (err) { 
    throw err;
  }
  homeContent = home;
});


fs.readFile("registration.html",(err, register) =>{
    if (err) {
        throw err;
    }
    registrationContent = register;
});

fs.readFile("project.html", (err, project) => {
  if (err) {
    throw err;
  }
  projectContent = project;
});

http
  .createServer((request, response) => {
    let url = request.url;
    response.writeHeader(200, { "Content-Type": "text/html" });
    switch (url) {
      case "/project":
        response.write(projectContent);
        response.end();
        
        break;

      case "/registration":
        response.write(registrationContent);
        response.end();
        break;
          
      default:
        response.write(homeContent);
        response.end();
        break;
    }
  })
  .listen(args["port"], (err)=>{
    if(err){
      throw err;
    };
    console.log(`server is at ${args["ports"]}`);
  });
  
