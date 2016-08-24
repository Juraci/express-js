import express from 'express';

const app = express();

app.get('/', (request, response) => {
  response.json('Hello world');
});

app.route('/blocks').get((req, res) => {
  let blocks = ['Fixed', 'Movable', 'Rotating'];
  let response;

  if(req.query.limit > 0) {
    response = blocks.slice(0, req.query.limit);
  } else {
    response = blocks;
  }
  res.json(response);
});

export default app;
