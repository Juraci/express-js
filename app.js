import express from 'express';

const app = express();

const blocks = {
  'Fixed': 'Fastened securely in position',
  'Movable': 'Capable of being moved',
  'Rotating': 'Moving in a circle around its center'
};

app.route('/blocks').get((req, res) => {
  let response;
  let ablocks = [];

  for(let key in blocks) {
    ablocks.push(key);
  }

  if(req.query.limit > 0) {
    response = ablocks.slice(0, req.query.limit);
  } else {
    response = ablocks;
  }
  res.json(response);
});

app.route('/blocks/:name').get((req, res) => {
  let description = blocks[req.params.name];

  if(!description) {
    res.status(404).json('Block not found');
  } else {
    res.json(description);
  }
});

export default app;
