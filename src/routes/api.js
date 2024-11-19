//api.js
import express from 'express'
const router = express.Router()
import apiUserController from '../controllers/apiUserController'
import apiProductController from '../controllers/apiProductController'

const initAPIRoute = (app) => {
  // User routes
  router.post('/login', apiUserController.handleLogin); 
  router.post('/register', apiUserController.handleRegister);
  router.post('/logout', apiUserController.handleLogout);

  // Product routes
  router.get('/product', apiProductController.fetchAllProducts);

  // Category routes

  return app.use("/api/v1", router)
}

export default initAPIRoute
