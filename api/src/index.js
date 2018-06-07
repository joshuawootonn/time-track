const app = require('./app');
require('dotenv').config();


const PORT = process.env.PORT || 3000;
app.listen(PORT, handleListen(console.log, PORT));