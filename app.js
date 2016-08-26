import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());


let blocks = {
  'Fixed': 'Fastened securely in position',
  'Movable': 'Capable of being moved',
  'Rotating': 'Moving in a circle around its center'
};

app.param('name', (req, res, next) => {
  let name = req.params.name;
  req.blockName = name[0].toUpperCase() + name.slice(1).toLowerCase();

  next();
});

app.route('/blocks')
  .get((req, res) => {
    let response;
    let ablocks = Object.keys(blocks);

    if(req.query.limit > 0) {
      response = ablocks.slice(0, req.query.limit);
    } else {
      response = ablocks;
    }
    res.json(response);
  })
  .post((req, res) => {
    let newBlock = req.body;
    blocks[newBlock.name] = newBlock.description;

    res.status(201).json(newBlock.name);
  });

app.route('/blocks/:name')
  .get((req, res) => {
    let description = blocks[req.blockName];

    if(!description) {
      res.status(404).json('Block not found');
    } else {
      res.json(description);
    }
  })
  .delete((req, res) => {
    if(!blocks[req.blockName]) {
      res.status(404).json('Block not found');
    } else {
      delete blocks[req.blockName];
      res.sendStatus(200);
    }
  });

export default app;
