require('dotenv').config();
const app = require("./app");

console.log(process.env.PORT_TEST); // Log PORT_TEST value
console.log(process.env.PORT_PROD); // Log PORT_PROD value

const port = process.env.NODE_ENV === 'test' ? process.env.PORT_TEST : process.env.PORT_PROD;
console.log(process.env.NODE_ENV);

app.listen(port);
console.log("Server running on port: " + port);
