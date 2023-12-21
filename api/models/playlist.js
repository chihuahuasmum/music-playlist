const fs = require('fs')
const filename = 'data/playlists.json'
let playlists = require('../data/playlists.json')

const findLatestId = function () {
    if (playlists.length > 0) {
        return playlists[playlists.length - 1].id + 1
    } else {
        return 1
    }
}

const writeFile = function (content) {
    fs.writeFileSync(filename, JSON.stringify(content), 'utf8', (err) => {
        if (err) {
            console.log(err)
        }
    })
}

const findAll = function () {
    return playlists;
}

const findById = function (id) {
    return new Promise((resolve, reject) => {
        const item = playlists.find(r => r.id == id)
        if (!item) {
            reject({
                message: 'Item not found',
                status: 404
            })
        }
        resolve(item)
    })
}

const insert = function (newItem) {
    const newDate = new Date().toString()
    return new Promise((resolve) => {
        const defaultValues = {
            id: findLatestId(),
            createdAt: newDate,
            updatedAt: newDate,
            songs: []
        }
        newItem = { ...defaultValues, ...newItem }
        playlists.push(newItem)
        writeFile(playlists)
        resolve(newItem)
    })
}

const insertSong = function (id, songId) {
    return new Promise((resolve, reject) => {
        findById(id)
        .then((item) => {
            const index = playlists.findIndex(p => p.id == item.id)
            
            playlists[index].songs.push(parseInt(songId))
            writeFile(playlists)
            resolve(playlists[index])
        })
        .catch(err => reject(err))
    })
}

const deleteSong = function (id, songId) {
    return new Promise((resolve, reject) => {
        findById(id)
        .then((item) => {
            const index = playlists.findIndex(p => p.id == item.id)
            playlists[index].songs =  playlists[index].songs.filter(s => s != songId)
            writeFile(playlists)
            resolve(playlists[index])
        })
        .catch(err => reject(err))
    })
}

module.exports = {
    findAll,
    findById,
    insert,
    insertSong,
    deleteSong
}