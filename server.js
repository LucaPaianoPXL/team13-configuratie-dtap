require('dotenv').config();
const app = require("./app");

let port;

if (process.env.NODE_ENV === 'test') {
    port = process.env.PORT_TEST || 3000;
} else if (process.env.NODE_ENV === 'production') {
    port = process.env.PORT_PROD || 3000;
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

console.log(process.env);
