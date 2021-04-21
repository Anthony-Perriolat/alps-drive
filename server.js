const express = require('express')
const { openFolder } = require('./drive')
const drive = require('./drive')
const app = express()
const port = 3000

app.use(express.static('frontend'))


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

// indexation drive 
app.get('/api/drive', (req, res) => {
  drive.listDrive('drive').then((content) => res.json(content))
})
// Selection dossier ou lecture 
app.get('/api/drive/:name', (req, res) => {
  drive.isFolder('drive/'+req.params.name).then((content) => {
    if (content) {
      drive.listDrive('drive/'+req.params.name).then((content) => res.json(content))
    }
    else
    {
      drive.readFile('drive/'+req.params.name).then((content) => res.send(content))
    }
  })
  .catch( () => res.status(404).send('erreur : 404'))
})
// ajout dossier
app.post('/api/drive', (req, res) => {
  drive.addFolder(req.query.name).then(() => {
    res.status(201).send()
  }).catch(() => res.status(400).end())
})
// ajout dossier dans un dossier
app.post('/api/drive/:folder', (req, res) => {
  drive.addFolder(req.params.folder+'/'+req.query.name).then(() => {
    res.status(201).end()
  }).catch(() => {
    if (!req.params.folder)
    res.status(404).end()
  })
})
// Suppression d'un dossier
app.delete('/api/drive/:name',(req, res) => {
  drive.deleteElement(req.params.name).then(() => {
    res.status(201).end()
  }).catch(() => {
    res.status(400).end()
  })
})
// Suppression d'un dossier dans un dossier
app.delete('/api/drive/:folder/:name',(req, res) => {
  drive.deleteElement(req.params.folder+'/'+req.params.name).then(() => {
    res.status(201).end()
  }).catch(() => {
    res.status(400).end()
  })
})
