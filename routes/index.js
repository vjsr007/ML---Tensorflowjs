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

router.get('/ex09', function(req, res){
  res.render('ex09', {
    title: 'ex09'
  });
});

router.get('/ex10', function(req, res){
  res.render('ex10', {
    title: 'ex10'
  });
});


router.get('/ml01', function(req, res){
  res.render('ml01', {
    title: 'ml01'
  });
});

router.get('/ml02', function(req, res){
  res.render('ml02', {
    title: 'ml02'
  });
});

router.get('/ml03', function(req, res){
  res.render('ml03', {
    title: 'ml03'
  });
});

router.get('/ml04', function(req, res){
  res.render('ml04', {
    title: 'ml04'
  });
});

router.get('/ml05', function(req, res){
  res.render('ml05', {
    title: 'ml05'
  });
});

router.get('/ml06', function(req, res){
  res.render('ml06', {
    title: 'ml06'
  });
});

router.get('/ml07', function(req, res){
  res.render('ml07', {
    title: 'ml07'
  });
});

router.get('/ml08', function(req, res){
  res.render('ml08', {
    title: 'ml08'
  });
});


module.exports = router;