const express = require('express')
const bodyParser= require( 'body-parser' )

const app = express()
  
const postsRoute = require( './routes/posts' )  
app.use(bodyParser.json())
app.use('/posts', postsRoute)
app.get('/', (req, res)=>{
    res.send({message: "Welcome"})
})
app.get('/blog', (req, res)=>{
    res.send('Blog Page')
})


module.exports= app
