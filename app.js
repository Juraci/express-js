import express from 'express';

const app = express();

const blocks = {
  'Fixed': 'Fastened securely in position',
  'Movable': 'Capable of being moved',
  'Rotating': 'Moving in a circle around its center'
};

app.param('name', (req, res, next) => {
  let name = req.params.name;
  req.blockName = name[0].toUpperCase() + name.slice(1).toLowerCase();

  next();
});

app.route('/blocks').get((req, res) => {
  let response;
  let ablocks = Object.keys(blocks);

  if(req.query.limit > 0) {
    response = ablocks.slice(0, req.query.limit);
  } else {
    response = ablocks;
  }
  res.json(response);
});

app.route('/blocks/:name').get((req, res) => {
  let description = blocks[req.blockName];

  if(!description) {
    res.status(404).json('Block not found');
  } else {
    res.json(description);
  }
});

export default app;
