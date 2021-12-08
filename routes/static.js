const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const Classes = require('../models/classes');


const data = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'config', 'data.json')))

router.get('/', (req, res) => {
    res.render('index', {
        index: data.index,
        imgDir: data.imgDir,
        email: data.email,
        social: data.social
    })
});

router.get('/about', (req, res) => {
    res.render('about', { about: data.about })
});

router.get('/illustrations', (req, res) => {
    res.render('illustrations', { illustrations: data.illustrations, imgDir: data.imgDir })
});

router.get('/classes', (req, res) => {
    res.render('workshops', { workshops: data.workshops })
});

router.get('/contact', (req, res) => {
    res.render('contact', { email: data.email, phone: data.phone, social: data.social })
});

router.get('/shop', (req, res) => {
    res.render('shop', { shop: data.shop })
});

router.get('/cart', (req, res) => {
    res.render('cart', { shop: data.shop, keyid: process.env.KEYID })
});

router.get('/register-class', (req, res) => {
    res.render('register-class', { shop: data.shop, keyid: process.env.KEYID })
});

module.exports = router;
