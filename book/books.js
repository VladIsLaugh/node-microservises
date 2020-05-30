const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = 4545

app.use(bodyParser.json())
const mongoose = require("mongoose");

require("./BookModel")
const Book = mongoose.model("Book")

mongoose.connect("mongodb+srv://vlados:vladik228@cluster0-wyfao.mongodb.net/test",
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}, 
()=>{
    console.log("databases is connected");
})

app.get('/', (req, res)=>{
    res.send("This is our main endpoint")
})
app.get('/book', (req, res)=>{
   Book.find().then((books)=>{
    res.json(books)
   }).catch(e =>{
       if(e) throw e
   })
})

app.get('/book/:id', (req, res)=>{
   Book.findById(req.params.id).then((book)=>{
       if(book){
        res.json(book)
       }else{
           res.sendStatus(404)
       }

   }).catch(e =>{
       if(e) throw e
   })
})

app.post('/book', function (req, res) {
    const newBook = new Book ({
        title: req.body.title,
        author: req.body.author,
        numberPages: req.body.numberPages,
        publisher: req.body.publisher,
    })
    newBook.save().then(()=>{
        console.log("Book is created");
    }).catch((e)=>{
        if(e) throw e 
    })
    res.send("Book is created")
})

app.delete('/book/:id', (req, res)=>{
    Book.findByIdAndRemove(req.params.id).then(()=>{
        res.send("Book removed")
    }).catch(e =>{
        if(e) throw e
    })

})

app.listen(PORT, ()=>{
    console.log(`Book service is running o port  ${PORT}`);
})