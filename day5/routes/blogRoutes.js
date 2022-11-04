const express = require('express');

const router = express.Router();

router.get('/blog/create', (req, res) => {
    res.send('<h1>Blog Create</h1>');
})

router.get('/blog/get', (req, res) => {
    res.send('<h1>Blog Get</h1>');
})

router.get('/blog/update', (req, res) => {
    res.send('<h1>Blog Update</h1>');
})

router.get('/blog/delete', (req, res) => {
    res.send('<h1>Blog Delete</h1>');
})

module.exports = router;