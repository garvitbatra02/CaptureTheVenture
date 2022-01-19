const connectToMongo=require('./db');
const express = require('express')
const app = express()
app.use(express.json());
const port = 5000
connectToMongo();

app.use("/api/auth",require("./routes/auth"));
app.use("/api/opportunities",require("./routes/opportunities"));
app.use("/api/sendmail",require("./routes/sendmail"));
app.use("/api/uploadimg",require("./routes/imageupload"));
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })