var express = require('express');
var searchRouter = express.Router();
var searchController = require('../controllers/searchController');

searchRouter.get('/search', function(req, res) {
    searchController.search(req,res);
});

module.exports = searchRouter;