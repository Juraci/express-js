import express from 'express';

const app = express();

app.get('/', (request, response) => {
  response.json('Hello world');
});

app.route('/blocks').get((req, res) => {
  res.json(['Fixed', 'Movable', 'Rotating']);
});

export default app;
