const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

const multer = require("multer");
const upload = multer({
  dest: "../front-end/public/images/",
  limits: {
    fileSize: 10000000,
  },
});

const mongoose = require("mongoose");

// connect to the database
mongoose.connect("mongodb://localhost:27017/creative4", {
  useNewUrlParser: true,
});

app.listen(3000, () => console.log("Server listening on port 3000!"));

const parkSchema = new mongoose.Schema({
  title: String,
  path: String,
  notes: String,
  description: String,
  size: String,
  location: String,
});

const Park = mongoose.model("Park", parkSchema);

app.post("/api/photos", upload.single("photo"), async (req, res) => {
  // Just a safety check
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: "/images/" + req.file.filename,
  });
});

app.post("/api/parks", async (req, res) => {
  const park = new Park({
    title: req.body.title,
    path: req.body.path,
    notes: req.body.notes,
    description: req.body.description,
    size: req.body.size,
    location: req.body.location,
  });
  try {
    await park.save();
    res.send(park);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get("/api/parks", async (req, res) => {
  try {
    let parks = await Park.find();
    res.send(parks);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete("/api/parks/:id", async (req, res) => {
  try {
    await Park.deleteOne({
      _id: req.params.id,
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put("/api/parks/:id", async (req, res) => {
  try {
    let parkToEdit = await Park.findOne({
      _id: req.params.id,
    });
    parkToEdit.description = req.body.description;
    parkToEdit.notes = req.body.notes;
    await parkToEdit.save();
    res.send(parkToEdit);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
