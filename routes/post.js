const express = require('express');
const router = express.Router();
const Insert = require('../models/insert');


router.get('',async(req, res) => {
    const Books = await Insert.find();
    res.json(Books);
})

router.post('', async (req, res) => {

    console.log(req.body);

    const insert = new Insert({
        title: req.body.title,
        author: req.body.author,
        language: req.body.language,
        description: req.body.description
    })
    try {
        const saveBook = await insert.save();
        res.json(saveBook);
    }
    catch (err) {
        res.json({ message: "Error" });
    }

})


router.get('/find=:book', async (req, res) => {
    let searchbook = req.params.book;


    const bookName = await Insert.findOne({ title: searchbook });

    if (bookName) {
        res.json({ message: 'Book Available' })
    } else {
        res.json({ message: 'Book NOT Available' })
    }
})

router.get('/findbyauthor=:auth', async (req, res) => {
    let searchauth = req.params.auth;


    const autherList = await Insert.find({author:searchauth});

    if (autherList.length === 0) {
        res.json({ message: 'Book NOT Available' })
        
    } else {
        res.json(autherList);
    }

})

router.delete('/deleteBook=:book', async (req, res) => {
    let searchbook = req.params.book;

    try{
    let del =await Insert.deleteOne({title:searchbook});
    res.json({ message: 'Book Deleted' })
    }
    catch(e){
        res.json({message:'cant delete'});
    }



})

router.delete('/deleteAuthor=:auth', async (req, res) => {
    let auth = req.params.auth;

    try{
    let del =await Insert.deleteMany({author:auth});
    res.json({ message: 'Books of '+auth+' Deleted' })
    }
    catch(e){
        res.json({message:'cant delete'});
    }

})

router.patch('/updateBook=:book', async (req, res) => {
    let searchbook = req.params.book;

    try{
    let updateBook =await Insert.updateOne({title:searchbook},{$set:{title: req.body.title,
        author: req.body.author,
        language: req.body.language,
        description: req.body.description}});
    res.json(updateBook);

    }
    catch(e){
        res.json({message:'cant Update'});
    }

})

module.exports = router;