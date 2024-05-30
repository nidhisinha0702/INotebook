const connectToMongo = require('./db');
connectToMongo();
const express = require('express')
const app = express()
const port = 3000
//const router = express.Router()
app.use(express.json())
//Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))
const cors = require('cors')
app.use(cors())
app.use(express.json())
app.listen(port, () => {
  console.log(`iNotebook app listening on port ${port}`)
})