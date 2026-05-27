const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const uri = process.env.MONGODB_URI;
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();

    const db = client.db("wanderlast");
    const destinationsCollection = db.collection("destinations");
    const bookingCollection = db.collection("bookings");

    app.get("/destinations", async (req, res) => {
      const destinations = await destinationsCollection.find().toArray();
      res.json(destinations);
    });

    app.get("/destination/:id", async (req, res) => {
      const { id } = req.params;
      const result = await destinationsCollection.findOne({
        _id: new ObjectId(id),
      });
      res.json(result);
    });

    app.post("/destination", async (req, res) => {
      const destination = req.body;
      console.log("destination", destination);
      const result = await destinationsCollection.insertOne(destination);
      res.json(result);
    });

    app.patch("/destination/:id", async (req, res) => {
      const { id } = req.params;
      const updatedData = req.body;
      console.log(updatedData);
      const result = await destinationsCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedData },
      );
      res.json(result);
    });

    app.delete("/destination/:id", async (req, res) => {
      const { id } = req.params;
      const result = await destinationsCollection.deleteOne({
        _id: new ObjectId(id),
      });
      res.json(result);
    });

    app.get("/booking/:userId", async (req, res) => {
      const { userId } = req.params;
      const result = await bookingCollection.find({ userId }).toArray();
      res.json(result);
    });

    app.post("/booking", async (req, res) => {
      const bookingData = req.body;
      // console.log("booking", bookingData);
      const result = await bookingCollection.insertOne(bookingData);
      res.json(result);
    });

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log("Server is running");
});
