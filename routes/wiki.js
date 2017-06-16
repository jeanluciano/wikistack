const express = require('express');
const router = express.Router();
const models = require('../models')


//this works but i'm pretty sure we gotta put it in index.js
router.get('/', function(req, res, next) {
 models.Page.findAll()
  .then(function(urls){
    console.log(urls[0].urlTitle);
    return urls.urlTitle;
  })
  .then( (url) => {
    res.redirect('/');
  })
  .catch(function(err){
    console.log(err);
  })
  
});

router.post('/', function(req, res, next) {
  let Page = models.Page.build({
    title: req.body.title,
    content: req.body.content
  })

  Page.save()
  .then(function(savedPage){
    res.redirect(savedPage.urlTitle)
  })
  .catch(function(err){
    console.log(err);
  })
});

router.get('/add', function(req, res, next) {
  res.render('addpage');
});

router.get('/:urlTitle', function (req, res, next) {
  models.Page.findOne({
    where: {
      urlTitle : req.params.urlTitle
    }
  })
  .then(function(foundPage){
    console.log(foundPage.title)
    res.render('wikipage',{page:foundPage})
  })
  
});


module.exports = router;