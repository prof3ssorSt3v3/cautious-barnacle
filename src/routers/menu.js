import { Router } from 'express';
import { sanitize } from '../services/sanitize.js';
import menu from '../models/menu.js';
import axios from 'axios';

const menuRouter = Router();

menuRouter.get('/', (req, res) => {
  console.log(req.session);
  console.log(req.session['menu-session-id']);

  res.json({ results: menu });
});
menuRouter.get('/:id', async (req, res) => {
  //talk to another api and build the response including the other data
  const response = await axios.get(`${process.env.API_URL}${req.params.id}`);
  //if :id = 4
  // https://jsonplaceholder.typicode.com/users/4
  res.json(response.data);
  // res.send(`GET ${req.params.id}`);
});
menuRouter.post('/', sanitize, (req, res) => {});
menuRouter.put('/:id', sanitize, (req, res) => {});
menuRouter.delete('/:id', (req, res) => {});

export default menuRouter;
