import { MongoClient } from 'mongodb';

export async function connectDatabase() {
  const client = await MongoClient.connect(
    'mongodb+srv://joconstantine:LTBBSdy99NrC2HHX@emaily.d1bhv.mongodb.net/events?retryWrites=true&w=majority'
  );
  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db();
  return await db.collection(collection).insertOne(document);
}

export async function getAllDocuments(client, collection) {
  const db = client.db();
  const documents = await db
    .collection(collection)
    .find()
    .sort({ _id: -1 })
    .toArray();
  return documents;
}
