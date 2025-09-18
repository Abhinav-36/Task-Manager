const app = require("./app");
const mongoose = require("mongoose")
require("dotenv").config();
//DB connection
const url = process.env.DB_URL;

mongoose.connect(url).then(()=> {
    console.log("DB is up and Running")
}).catch((e) => console.log(e));


//Server Connection
const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Backend is up and Running on port ${port}`);
})
