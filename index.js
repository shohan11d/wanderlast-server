const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const { MongoClient, ServerApiVersion } = require("mongodb");
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

    app.get("/destinations", async (req, res) => {
      const destinations = await destinationsCollection.find().toArray();
      res.json(destinations);
    });

    app.post("/destination", async (req, res) => {
      const destination = req.body;
      console.log("destination", destination);
      const result = await destinationsCollection.insertOne(destination);
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
