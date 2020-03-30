const express = require("express")
const mongoose = require("mongoose")
const config = require("config")
const path = require("path")
const app = express()

const PORT = process.env.PORT || 5000

mongoose
  .connect(config.get("mongoURI"), {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Database connected"))
  .catch(err => {
    console.log("Database not connected")
    console.log(err)
  })

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"))

  app.get("*", (req, res) => {
    res.sendfile(path.resolve(__dirname, "client", "build", "index.html"))
  })
}

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`))
