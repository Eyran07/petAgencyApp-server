const dotenv = require("dotenv");
const bodyParser = require('body-parser');
dotenv.config();
const express = require("express");
const app = express();
const usersRouter = require("./routes/signup");
const loginRouter = require("./routes/login");
const petRouter = require("./routes/pet");
const getUsersRouter = require("./routes/getUsers");
const getUsersIdRouter = require("./routes/getUserId");
const updateUserRouter = require("./routes/updateUser");
const getPetRouter = require("./routes/getPet");
const adoptPetRouter = require("./routes/adoptPet");
const returnPetRouter = require("./routes/returnPet");
const savePet = require("./routes/savePet");
const unsavePet = require("./routes/unsavePet");
const fullUser = require("./routes/fullUser");
const getPetSavedId = require("./routes/getPetSavedId");
const getPetAdoptedId = require("./routes/getPetAdoptedId");
const updatePet = require("./routes/updatePet");
const updateUser = require("./routes/updateUser");

// Add middleware to set CORS headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.use(express.json());
app.use(bodyParser.json());
app.use("/users", usersRouter);
app.use("/login", loginRouter);
app.use("/pet", petRouter);
app.use("/users", getUsersRouter);
app.use("/userss", getUsersIdRouter);
app.use("/user", updateUserRouter);
app.use("/pet", getPetRouter);
app.use("/pets", adoptPetRouter);
app.use("/pets", returnPetRouter);
app.use("/pets", savePet);
app.use("/pets", unsavePet);
app.use("/user", fullUser);
app.use("/petss", getPetAdoptedId);
app.use("/petss", getPetSavedId);
app.use("/pet", updatePet);
app.use("/user", updateUser);

app.listen(3003, () => {
  console.log("Server listening on port 3003");
});
