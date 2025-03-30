import express from 'express'

const server = express()
server.use(express.json())

const port = 3000


// server.get('/usuarios', (req, res)=>{
//     res.send('GG')
// })

const users = []

server.post('/usuarios', (req, res) =>{
    users.push(req.body)

    res.status(201).json(req.body)
})

server.get('/usuarios', (req,res) =>{
    res.status(200).json(users)
})

server.listen(port, ()=>{
    console.log('O server esta rodando')
})