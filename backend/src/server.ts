// server.ts
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema.js';
import connectDB from './db.js';
import cors from 'cors';

const app = express();

connectDB();

app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true, // Enable GraphiQL UI
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
