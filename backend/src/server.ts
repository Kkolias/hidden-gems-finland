import express from 'express';
import endpoints from "./routes/routes";

// add cors and whitelist urls which can access the api
import cors from 'cors';

const corsOptions = {
  origin: ['http://localhost:5173'], // Replace with your frontend URL
  optionsSuccessStatus: 200
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
const PORT = process.env.PORT || 3030;

app.get('/', (_req, res) => {
  res.send('Hello, World!');
});

app.use(endpoints)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});