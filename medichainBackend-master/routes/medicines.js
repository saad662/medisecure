const express = require("express");
const router = express.Router();
const Medicines = require("../models/Medicines").Medicines;
const verifyToken = require("../middlewares/verifyToken");
const { Productions } = require("../models/Productions");

//protected route
router.get("/getAll", (req, res) => {
  try {
    const medicines = Medicines.find().populate(
      "production",
      "-password -token"
    );
    medicines
      .then((allMedicines) => {
        res.send({ result: allMedicines });
      })
      .catch((e) => {
        res.send({ message: e.message });
      });
  } catch (e) {
    res.send({ message: "invalid request" });
  }
});

router.get("/getMedicineById/:id", (req, res) => {
  var id = req.params.id;
  console.log(id, "id");
  const medicines = Medicines.findOne({ id }).populate(
    "production",
    "-password -token"
  );

  medicines
    .then((allMedicines) => {
      allMedicines.token = null;
      res.send({ result: allMedicines });
    })
    .catch((e) => {
      res.send({ message: e.message });
    });
});
router.get("/getMedicineByProduction/:id", (req, res) => {
  var id = req.params.id;
  console.log(id, "id");
  const medicines = Medicines.find({ production: id });
  medicines
    .then((allMedicines) => {
      res.send({ data: allMedicines, message: "success" });
    })
    .catch((e) => {
      res.send({ message: e.message, error: true });
    });
});

router.post("/add", (req, res) => {
  const medicine = req.body;
  console.log(medicine, "medicine");
  const newMedicine = new Medicines(medicine);
  console.log(newMedicine, "newMedicine");
  newMedicine
    .save()
    .then(() => {
      res.send({ data: newMedicine, message: "medicine added successfully" });
    })
    .catch((e) => {
      console.log("e ===>", e);
      res.send({ message: e.message, error: true });
    });
});

router.put("/update", (req, res) => {
  const medicine = req.body;
  if (medicine.id) {
    const newMedicine = Medicines.findOne({ id: medicine.id }).update(medicine);
    newMedicine
      .then(() => {
        res.send({ message: "Medicine updated successfully!" });
      })
      .catch((e) => {
        console.log("e ===>", e);
        res.send({ message: e.message });
      });
  } else {
    res.send({ message: "Id is not present for the entity" });
  }
});

module.exports = router;
