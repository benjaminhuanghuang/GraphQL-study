import express from "express";
const PORT = 8964;

const app = express();

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(PORT, () => {
  console.log(`Express sever is running at port ${PORT}`);
});
