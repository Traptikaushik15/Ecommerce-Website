const mongoose = require("mongoose");

const dotenv = require("dotenv");

const app = require("./app");

dotenv.config({ path: "./.env" });

const DB =
  "mongodb+srv://STYKE:TraptiSTYKE@cluster0.rnwco.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
  
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connection successful!");
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on PORT ${port}`);
});
