var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
  res.render('index', {
    title: 'Home'
  });
});

router.get('/home', function(req, res){
  res.render('index', {
    title: 'Home'
  });
});

router.get('/ex01', function(req, res){
  res.render('ex01', {
    title: 'ex01'
  });
});

router.get('/ex02', function(req, res){
  res.render('ex02', {
    title: 'ex02'
  });
});

router.get('/ex03', function(req, res){
  res.render('ex03', {
    title: 'ex03'
  });
});

router.get('/ex04', function(req, res){
  res.render('ex04', {
    title: 'ex04'
  });
});

router.get('/ex05', function(req, res){
  res.render('ex05', {
    title: 'ex05'
  });
});

router.get('/ex06', function(req, res){
  res.render('ex06', {
    title: 'ex06'
  });
});

router.get('/ex07', function(req, res){
  res.render('ex07', {
    title: 'ex07'
  });
});

router.get('/ex08', function(req, res){
  res.render('ex08', {
    title: 'ex08'
  });
});

module.exports = router;