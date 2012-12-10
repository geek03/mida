// Private Functions

function writeConfig(par){
    var fs = require('fs');
    try{
        var stream = fs.createWriteStream("config/checkStop.txt");
        stream.once('open', function(fd) {
            stream.write(par);
        });
        return true;
    }catch(e){
        console.log(e);
        return false;
    }
}



// Public Functions


function startProcess(response) {
    console.log("Request handler 'startProcess' was called.");
    response.writeHead(200, {"Content-Type": "text/plain"});
    if (writeConfig("stop=false")){
        // Start Video Capture
        
        var spawn = require('child_process').spawn,
            bmdcapture= spawn('ls', ['-lh', '/usr']); // FABIO : Cambiare comando 

        /*exec("find /",
            { timeout: 10000, maxBuffer: 20000*1024 },
            function (error, stdout, stderr) {
            response.writeHead(200, {"Content-Type": "text/plain"});
            response.write(stdout);
        });*/
        response.write('{"status": 200, "message": "Process Started" ,"error": null }');
    }else{
        response.write('{"status": 400, "message": null ,"error": "write config file error" }');
    }
    response.end();
}


function lightstop(response) {
    console.log("Request handler 'lightstop' was called.");
    response.writeHead(200, {"Content-Type": "text/plain"});
    // Write config file for light stop
    if (writeConfig("stop=light")){
        response.write('{"status": 200, "message": "Process wait to light stop" ,"error": null }');
    }else{
        response.write('{"status": 400, "message": null ,"error": "write config file error" }');
    }
    response.end();
}

function hardstop(response) {
    console.log("Request handler 'hardstop' was called.");
    response.writeHead(200, {"Content-Type": "text/plain"});
    
    
    // Stop All Process
    
    
    
    // Write config file for hard stop
    if (writeConfig("stop=hard")){
        response.write('{"status": 200, "message": "Process stopped" ,"error": null }');
    }else{
        response.write('{"status": 400, "message": null ,"error": "write config file error" }');
    }
    response.end();
}

exports.startProcess = startProcess;
exports.lightstop = lightstop;
exports.hardstop = hardstop;