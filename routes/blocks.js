import express from 'express';
import bodyParser from 'body-parser';

const router = express.Router();
let jsonParser = bodyParser.json();

let blocks = {
  'Fixed': 'Fastened securely in position',
  'Movable': 'Capable of being moved',
  'Rotating': 'Moving in a circle around its center'
};


router.route('/')
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
  .post(jsonParser, (req, res) => {
    let newBlock = req.body;
    blocks[newBlock.name] = newBlock.description;

    res.status(201).json(newBlock.name);
  });

router.route('/:name')
  .all((req, res, next) => {
    if(req.params.name) {
      let name = req.params.name;
      req.blockName = name[0].toUpperCase() + name.slice(1).toLowerCase();
    }
    next();
  })
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

export default router;
