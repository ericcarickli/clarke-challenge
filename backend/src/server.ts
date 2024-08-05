// server.ts
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import multer from 'multer';
import express from 'express';
import connectDB from './db.js';
import schema from './schema.js';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';
import { graphqlHTTP } from 'express-graphql';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const app = express();

connectDB();

// app.use(cors());
app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${uuidv4()}-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage });

app.post('/upload', upload.single('file'), (req, res) => {
  try {
    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file?.filename}`;
    res.status(200).json({ url: fileUrl });
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload file' });
  }
});

app.use('/uploads', express.static(uploadsDir));

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true, // Enable GraphiQL UI
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
