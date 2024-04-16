const express = require('express')
const bodyParser= require( 'body-parser' )
const postsRoute = require( './routes/posts' ) 
const userRoute = require( './routes/user' )
const app = express()
  

app.use(bodyParser.json())
app.use('/posts', postsRoute)
app.use('/user', userRoute)
app.get('/', (req, res)=>{
    res.send({message: "Welcome"})
})
app.get('/blog', (req, res)=>{
    res.send('Blog Page')
})


module.exports= app
