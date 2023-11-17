require('dotenv').config();
const app = require("./app");

const port = process.env.NODE_ENV === 'test' ? process.env.PORT_TEST : process.env.PORT_PROD;
console.log('port: ${port} env: process.env.NODE_ENV);
//app.listen(port, () => {    console.log(`Server is running on port ${port}`);});
