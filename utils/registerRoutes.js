const express = require('express');

module.exports = function registerRoutes(routesHandler) {
  const Router = express.Router();
  routesHandler(Router);
  return Router;
}
