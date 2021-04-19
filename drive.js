
// Création dossier temporaire 
const os = require('os');
const fs = require('fs');
const path = require('path');
const { error } = require('console');
const http = require('http');

//Chemin du drive en local
const pathDrive = os.tmpdir()+path.sep+'drive'
if (!fs.existsSync(pathDrive)) {
fs.promises.mkdir(pathDrive)
.then(() => console.log('repertoire crée'))
.catch((err) => console.log(err))
console.log(pathDrive)
}
else {
    console.log('Le dossier à déjà était crée')
}

// Retourne une liste contenant les dossiers et fichiers à la racine du “drive” sous forme de array

function listDrive() {
    let arrayDrive = fs.promises.readdir(pathDrive, {withFileTypes:true})
    const transformPromise = arrayDrive.then((result) => {
        let tab = [];
        result.forEach(function (toto){
            tab.push({
                name: toto.name,
                isFolder: toto.isDirectory()
            })

    })
    return tab;
    })

    return transformPromise;
} 

module.exports = {listDrive:listDrive}

