// list dependencies
var express = require('express');
var router = express.Router();

// add db & model dependencies
var mongoose = require('mongoose');
var Buisness = require('../models/buisness');

// Show the companies
router.get('/companys', function (req, res, next) {

    // Gets all the companies in the buisness model, if not there will be an error
    Buisness.find(function (err, companys) {
        // if there is an error
        if (err) {
            res.render('error', { error: err });
        }
        else {
            // Else if there is no error show the companys view, with the information
            res.render('companys', { companys: companys });
            console.log(companys);
        }
    });
});

// Edit a single companies information by retrieving its id
router.get('/companys/edit/:id', function (req, res, next) {
    //store the id from the url in a variable
    var id = req.params.id;

    //use the buisness model to look up the company with this id    
    Buisness.findById(id, function (err, buisness) {
        if (err) {
            res.send('Buisness ' + id + ' not found');
        }
        else {
            res.render('edit', { buisness: buisness });
        }
    });
});

// Update the selected companies information
router.post('/companys/edit/:id', function (req, res, next) {
    var id = req.body.id;

    var buisness = {
        _id: req.body.id,
        company: req.body.company,
        description: req.body.description,
        category: req.body.category,
        address: req.body.address,
        owner: req.body.owner,
        number: req.body.number
    };

    Buisness.update({ _id: id}, buisness, function(err) {
        if (err) {
            res.send('Buisness ' + req.body.id + ' not updated. Error: ' + err);
        }
        else {
            res.statusCode = 302;
            res.setHeader('Location', 'http://' + req.headers['host'] + '/companys');
            res.end();
        }
    });
});

// Retrieve the company add page to give the add form to add a company
router.get('/companys/add', function (req, res, next) {
    res.render('add');
});

// Add the company
router.post('/companys/add', function (req, res, next) {

    // use the buisness model to insert the new business
    Buisness.create({
        company: req.body.company,
        description: req.body.description,
        category: req.body.category,
        address: req.body.address,
        owner: req.body.owner,
        number: req.body.number
    }, function (err, Buisness) {
        if (err) {
            console.log(err);
            res.render('error', { error: err }) ;
        }
        else {
            console.log('Buisness saved ' + Buisness);
            res.render('added', { buisness: Buisness.company });
        }
    });
});

// API to get all the companies listed
router.get('/api/companys', function (req, res, next) {
    Buisness.find(function (err, companys) {
        if (err) {
            res.send(err);
        } 
        else {
            res.send(companys);
        }
    });
});

// API to GET individual buisness' based on their given id
router.get('/api/companys/:id', function (req, res, next) {
    //Get the id from the url and put it into a variable and make a variable to store the companies information
    var id = req.params.id;
    var buisness = {
        company: req.body.company,
        description: req.body.description,
        category: req.body.category,
        address: req.body.address,
        owner: req.body.owner,
        number: req.body.number
    };
    //use the buisness model to look up the company with this id, and displays its information 
    Buisness.findById(id, function (err, buisness) {
        if (err) {
            res.send('Buisness ' + id + ' not found');
        }
        else {
            res.send({buisness:buisness});
        }
    });
});

// API to GET individual buisness' based on their given id
router.get('/companys/indiv/:id', function (req, res, next) {
    //store the id from the url in a variable
    var id = req.params.id;

    //use the buisness model to look up the company with this id
    Buisness.findById(id, function (err, buisness) {
        if (err) {
            res.send('Buisness ' + id + ' not found');
        }
        else {
            res.render('indiv', { buisness: buisness });
        }
    });
});
  
// Delete the business based on its id   
router.get('/companys/delete/:id', function (req, res, next) {
    //store the id from the url into a variable
    var id = req.params.id;

    //use the buisness model to delete the company.
    Buisness.remove({ _id: id }, function (err, buisness) {
        if (err) {
            res.send('Buisness ' + id + ' not found');
        }
        else {
            res.statusCode = 302;
            res.setHeader('Location', 'http://' + req.headers['host'] + '/companys');
            res.end();
        }
    });
});

// make controller public
module.exports = router;
