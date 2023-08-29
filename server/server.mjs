import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import users from "./routes/users.mjs";

const PORT = 8000;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", users);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
