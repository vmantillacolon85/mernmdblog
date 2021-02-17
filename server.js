// const express = require("express")
// const articleRouter= require("./routes/articles.js")
// const app = express()
//
//
// app.set("view engine", "ejs")

// app.get("/", (req, res) => {
//   res.send('Hello World')
// })

// app.use("/articles", articleRouter)
//
//
// app.get("/", (req, res) => {
//   const articles = [{
//     title: "Test Article",
//     createdAt: new Date(),
//     descriptions: "Test Description"
//
//   },
//   {
//     title: "Test Article 2",
//     createdAt: new Date(),
//     descriptions: "Test Description 2"
//
//   }]
//   res.render('articles/index', { articles: articles})
// })

const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')

const articleRouter = require('./routes/articles')

const methodOverride = require('method-override')
const app = express()

mongoose.connect('mongodb://localhost/blog', {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
})

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false }))

app.use(methodOverride('_method'))

app.get('/', async (req, res) => {

  const articles = await Article.find().sort({ createdAt: 'desc' })

  res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter)

app.listen(5000)
