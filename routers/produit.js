const express = require("express");
const {
  ajouterproduit,
  getProduit,
  updateproduit,
  deleteproduit,
} = require("../controllers/produit");
const router = express.Router();

router.route("/utilisateurs").post(ajouterproduit);
router.route("/utilisateurs").get(getProduit);
router.route("/utilisateurs/:id").get(updateproduit);
router.route("/utilisateurs/:id").put(updateUtilisateur);
router.route("/utilisateurs/:id").delete(deleteproduit);

module.exports = router;
