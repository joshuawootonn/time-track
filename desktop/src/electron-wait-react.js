var net = require("net");
var port = process.env.PORT ? Number(process.env.PORT) - 100 : 3000;
process.env.ELECTRON_START_URL = "http://localhost:" + port;
var client = new net.Socket();
var startedElectron = false;
var tryConnection = function () {
    return client.connect({ port: port }, function () {
        client.end();
        if (!startedElectron) {
            // console.log('starting electron');
            startedElectron = true;
            var exec = require("child_process").exec;
            exec("npm run electron");
        }
    });
};
tryConnection();
client.on("error", function () {
    setTimeout(tryConnection, 1000);
});
