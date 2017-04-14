var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var OFFERS_COLLECTION = "offers";

var app = express();
app.use(bodyParser.json());

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect('mongodb://localhost:27017/offers', function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

// OFFERS API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

/*  "/api/offers"
 *    GET: finds all offers
 *    POST: creates a new offer
 */

app.get("/api/offers", function(req, res) {
  db.collection(OFFERS_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get offers.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/api/offers", function(req, res) {
  var newOffer = req.body;

  if (!req.body.name) {
    handleError(res, "Invalid user input", "Must provide a name.", 400);
  }

  db.collection(OFFERS_COLLECTION).insertOne(newOffer, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new offer.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

/*  "/api/offers/:id"
 *    GET: find offer by id
 *    PUT: update offer by id
 *    DELETE: deletes offer by id
 */

app.get("/api/offers/:id", function(req, res) {
  db.collection(OFFERS_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get offer");
    } else {
      res.status(200).json(doc);
    }
  });
});

app.put("/api/offers/:id", function(req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(OFFERS_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update offer");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

app.delete("/api/offers/:id", function(req, res) {
  db.collection(OFFERS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete offer");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});

app.post("/api/authenticate", function(req,res) {
  var login = req.body;
  console.log(login);
  if(login.username == 'admin' && login.password == 'admin2017' ) {
    res.status(200).json({token: 'authenticated'});
  } else {
    res.status(200).json({invalid: 'true'});
  }
});