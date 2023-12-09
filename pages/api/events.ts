import clientPromise from "@/lib/mongodb";

export default async (req: any, res: any) => {
  if (req.method === "GET") {
    try {
      const client = await clientPromise;
      const db = client.db("eventsdb");

      const events = await db.collection("events").find({}).limit(50).toArray();

      res.json(events);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (req.method === "POST") {
    try {
      const client = await clientPromise;
      const db = client.db("eventsdb");

      // Assuming your request body contains the new event data
      const newEvent = req.body;

      const result = await db.collection("events").insertOne(newEvent);

      if (result.insertedId) {
        res.status(201).json({ message: "Data created successfully" });
      } else {
        res.status(500).json({ error: "Failed to create data" });
      }
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
};
