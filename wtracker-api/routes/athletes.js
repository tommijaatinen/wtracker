var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Athlete = require('../models/Athlete.js');

var errorHandler = function(err, obj) {
      if (err)
          return next(err);
       res.json(obj);    
}

router.get('/', function(req, res, next) {
    Athlete.find(function (err, athletes) {
        if(err) 
            return next(err);
        res.json(athletes);        
    });
});

router.get('/:id', function(req, res, next) {
   Athlete.findById(req.params.id, function(err, athlete) {
      if (err)
          return next(err);
       res.json(athlete);
   }); 
});

router.put('/', function(req, res, next) {
    Athlete.create(req.body, function(err, athlete) {
        if(err)
            return next(err);
        res.json(athlete);
    });
});

router.delete('/:id', function(req, res, next) {
   Athlete.findByIdAndRemove(req.params.id, function(err, athlete) {
      if (err)
          return next(err);
       res.json(athlete);
   }); 
});



module.exports = router;
