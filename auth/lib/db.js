import { MongoClient } from 'mongodb';

export async function connectToDatabase() {
  const client = await MongoClient.connect(
    'mongodb+srv://joconstantine:LTBBSdy99NrC2HHX@emaily.d1bhv.mongodb.net/auth-demo?retryWrites=true&w=majority'
  );
  return client;
}
