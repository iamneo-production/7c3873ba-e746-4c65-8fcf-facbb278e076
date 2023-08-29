import { MongoClient } from "mongodb";
import 'dotenv/config';

const connectionString = process.env.ATLAS_URI || "";

async function connectToDatabase() {
  const client = new MongoClient(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas");
    return client.db("TelecomApp");
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas:", error);
    return null;
  }
}

const db = await connectToDatabase();

export default db;
