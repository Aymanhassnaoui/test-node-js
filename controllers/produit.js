const { ObjectID } = require("bson");
const client = require("../db/connect");
const { Produits } = require("../models/produit");         

const ajouterproduit = async (req, res) => {
  try {
    let produit = new Produits(
      req.body.name,                                             
      req.body.type,
      req.body.price,
      req.body.rating,
      req.body.warranty_years,
      req.body.available
    );
    let result = await client
      .db()
      .collection("produits")
      .insertOne(produit);

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(501).json(error);
  }
};



const getProduit = async (req, res) => {
  try {
    let id = new ObjectID(req.params.id);
    let cursor = client.db().collection("produits").find({ _id: id });
    let result = await cursor.toArray();
    if (result.length > 0) {
      res.status(200).json(result[0]);
    } else {
      res.status(204).json({ msg: "Cet produit n'existe pas" });
    }
  } catch (error) {
    console.log(error);
    res.status(501).json(error);
  }
};


const updateUtilisateur = async (req, res) => {
  try {
    let id = new ObjectID(req.params.id);
    let name = req.body.name;
    let type = req.body.type;                                     
    let price = req.body.price;
    let rating = req.body.rating;
    let warranty_years = req.body.warranty_years;
    let available = req.body.available;
    let result = await client
      .db()
      .collection("utilisateurs")
      .updateOne({ _id: id }, { $set: { name, type, price,rating,warranty_years,available } });

    if (result.modifiedCount === 1) {
      res.status(200).json({ msg: "Modification réussie" });
    } else {
      res.status(404).json({ msg: "Cet produit n'existe pas" });
    }
  } catch (error) {
    console.log(error);
    res.status(501).json(error);
  }
};

const deleteproduit = async (req, res) => {
  try {
    let id = new ObjectID(req.params.id);
    let result = await client
      .db()
      .collection("produits")
      .deleteOne({ _id: id });
    if (result.deletedCount === 1) {
      res.status(200).json({ msg: "Suppression réussie" });
    } else {
      res.status(404).json({ msg: "Cet produit n'existe pas" });
    }
  } catch (error) {
    console.log(error);

    res.status(501).json(error);
  }
};

module.exports = {
  ajouterproduit,
  getProduit,
  updateUtilisateur,
  deleteproduit,
};
