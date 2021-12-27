import {
  connectDatabase,
  insertDocument,
  getAllDocuments,
} from '../../../helpers/db-util';

async function handler(req, res) {
  const eventId = req.query.eventId;

  let client;
  try {
    client = await connectDatabase();
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'connecting to the database failed' });
  }

  if (req.method === 'POST') {
    const { email, name, text } = req.body;

    if (
      !email ||
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !text ||
      text.trim() === ''
    ) {
      return res.status(402).json({
        message: 'Invalid input.',
      });
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    try {
      const result = await insertDocument(client, 'comments', newComment);
      newComment._id = result.insertedId;
      res.status(202).json({ message: 'Added comment.', comment: newComment });
    } catch (error) {
      res.status(500).json({ message: 'Inserting comment failed!' });
    }
  }

  if (req.method === 'GET') {
    let documents;
    try {
      documents = await getAllDocuments(client, 'comments');
      res.status(200).json({ comments: documents });
    } catch (error) {
      res.status(500).json({ message: 'Getting comments failed!' });
    }
  }

  client.close();
}

export default handler;
