const express = require('express')
const drive = require('./drive')
const app = express()
const port = 3000

app.use(express.static('frontend'))


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
app.get('/api/drive', (req, res) => {
  drive.listDrive().then((content) => {res.send({content})})
})