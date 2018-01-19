var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Person = require('../models/Person.js');

var errorHandler = function(err, obj) {
      if (err)
          return next(err);
       res.json(obj);    
}

router.get('/', function(req, res, next) {
    Person.find(function (err, persons) {
        if(err) 
            return next(err);
        res.json(persons);        
    });
});

router.get('/:id', function(req, res, next) {
   Person.findById(req.params.id, function(err, person) {
      if (err)
          return next(err);
       res.json(person);
   }); 
});

router.put('/', function(req, res, next) {
    Person.create(req.body, function(err, person) {
        if(err)
            return next(err);
        res.json(person);
    });
});

router.delete('/:id', function(req, res, next) {
   Person.findByIdAndRemove(req.params.id, function(err, person) {
      if (err)
          return next(err);
       res.json(person);
   }); 
});



module.exports = router;
