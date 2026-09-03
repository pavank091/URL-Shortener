const express = require("express");
const { connectToMongoDB } = require("./connect");
const urlRoute = require("./routes/url");

const app = express();
const PORT = 8001;

// Middleware
app.use(express.json());

// Connection
connectToMongoDB('mongodb://localhost:27017/short-url')
.then(() => console.log("MongoDb Connected!"))
 
// route
app.use("/url", urlRoute);

app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));