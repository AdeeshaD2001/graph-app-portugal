//define as rotas no backend

import {  Router  } from "express";
import GraphsController from "./controllers/GraphsController";
import UserController from "./controllers/UserController";
import AccessController from "./controllers/AccessController";
import CartsController from "./controllers/CartsController";
import auth from "./middlewares/auth";
import SessionsController from "./controllers/SessionsController";
import TransactionsController from "./controllers/TransactionsController";
import PostbackController from "./controllers/PostbackController";


const routes = new Router();

// controles pubicos
routes.post('/sessions', SessionsController.create);
// controlador de financeiro
routes.get('/carts', CartsController.index);
routes.post('/carts', CartsController.create);
routes.put('/carts/:id', CartsController.update);
routes.delete('/carts/:id', CartsController.destroy);
routes.post('/transactions', TransactionsController.create);
routes.post('/postback/pagarme', PostbackController.pagarme);
//controles privados

// routes.use(auth); // FALTA VER SEGURANÇA AUTENTICAÇÃO AQUI.
routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.post('/users', UserController.create);
routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.delete);
routes.get('/graphs', GraphsController.index);
routes.post('/graphs', GraphsController.create);
routes.get('/users/:user_id/graphs', AccessController.index);
routes.put('/users/:user_id/subscription', AccessController.update);
// routes.delete('/users/:user_id/graphs', GraphsController.delete);
export default routes;