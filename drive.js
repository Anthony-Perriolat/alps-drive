
// Création dossier temporaire 
const os = require('os');
const fs = require('fs');
const path = require('path');
const { error } = require('console');
const http = require('http');

//Chemin du drive en local
const pathDrive = os.tmpdir() + path.sep
if (!fs.existsSync(pathDrive + 'drive')) {
    fs.promises.mkdir(pathDrive + 'drive')
        .then(() => console.log('repertoire crée'))
        .catch((err) => console.log(err))
    console.log(pathDrive)
}
else {
    console.log('Le dossier à déjà était crée')
}

// obtenir la taille d'un fichier en bit 

function getSize(target) {
    return fs.promises.stat(pathDrive + 'Drive/' + target)

}

// Retourne une liste contenant les dossiers et fichiers à la racine du “drive” sous forme de array

function listDrive(target) {
    let arrayDrive = fs.promises.readdir(pathDrive + target, { withFileTypes: true })
    const transformPromise = arrayDrive
        .then((result) => {
            const tab = [];
            result.forEach(function (element) {
                if (element.isDirectory()) {
                    tab.push({
                        name: element.name,
                        isFolder: element.isDirectory()
                    })
                }
                else {
                    getSize(element.name).then((obj) => {
                        tab.push({
                            name: element.name,
                            size: getSize(element.name),
                            isFolder: element.isDirectory()
                        })
                    })    
                }
            })
            return tab;
        })

    return transformPromise;
}
function isFolder(target) {
    let isFolder = fs.promises.stat(pathDrive + target)
        .then((stats) => stats.isDirectory())
    return isFolder;
}
function readFile(target) {
    const readingTarget = fs.promises.readFile(pathDrive + target, { encoding: 'UTF-8' })
    return readingTarget
}
function addFolder(name = '') {
    const add = fs.promises.mkdir(pathDrive + 'drive' + path.sep + name)
        .then(() => console.log('le dossier ' + name + ' à été crée'))
        .catch((err => console.log(err)))
    return add
}
function deleteElement(name) {
    const del = fs.promises.rm(pathDrive + 'drive' + path.sep + name, { recursive: true, force: true })
    return del
}
/* function isValid(name) {
    return /^[a-zA-Z0-9_()\. ]*test(name)
}
 */
// Upload 
function upload(tmp, name, uuid, folder = '') {
    const up = fs.promises.copyFile(tmp, pathDrive + 'drive' + path.sep + folder + name)
        .then(fs.promises.rm(os.tmpdir() + path.sep + 'express-busboy/' + uuid, { recursive: true, force: true }))
    return up
}

module.exports = {
    listDrive: listDrive,
    isFolder: isFolder,
    readFile: readFile,
    addFolder: addFolder,
    deleteElement: deleteElement,
    upload: upload,
    pathDrive: pathDrive
}

