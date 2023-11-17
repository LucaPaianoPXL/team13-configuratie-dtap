require('dotenv').config();
let port;

if(process.env.NODE_ENV === 'testServer') {
    port = process.env.PORT_TEST || 3000;
} else if(process.env.NODE_ENV === 'productionServer') {
    port = process.env.PORT_PROD || 3000;
}

app.listen(port, () => {
    console.log("Server running on port: " + port);
});
