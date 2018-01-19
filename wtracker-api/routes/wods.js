var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Wod = require('../models/Wod.js');


router.get('/', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');

    Wod.find(function (err, wods) {
        if(err) 
            return next(err);
        res.json(wods);        
    });
});

router.get('/:id', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');

    Wod.findById(req.params.id, function(err, wod) {
      if (err)
          return next(err);
       res.json(wod);
   }); 
});

router.post('/', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');

    Wod.create(req.body, function(err, wod) {
        if(err)
            return next(err);
        res.json(wod);
    });
});

router.put('/:id', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');

    Wod.findById({_id: req.params.id}, function(err, w) {
        if (!w) {
            return next(new Error('Could not load WOD object'));
        } else {
            w.name = req.body.name;
            w.description = req.body.description;
            w.type = req.body.type;
            w.save(function(err) {
                if (err)
                    console.log('error updating Wod')
            });
            res.json(w);
        }
    });
});


router.delete('/:id', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');

    Wod.remove({_id: req.params.id}, function(err, wod) {
        if(err)
            return next(err);
        res.json(wod);
    });
});

module.exports = router;
