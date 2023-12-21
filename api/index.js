const express = require('express')
const morgan = require('morgan')
const song = require('./models/song')
const playlist = require('./models/playlist')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(morgan('tiny'))
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true
    })
)
app.use(cors())

// Endpoints
app.get('/', (req, res) => {
    res.json({ message: 'Hello world' })
})

app.get('/songs', function (req, res) {
    res.json(song.findAll())
})

app.get('/playlists', function (req, res) {
    res.json(playlist.findAll())
})
app.get('/playlist/:id', function (req, res) {
    const id = req.params.id

    playlist.findById(id)
        .then(item => res.json(item))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message })
            } else {
                res.status(500).json({ message: err.message })
            }
        })
})
app.post('/playlist', function (req, res) {
    playlist.insert(req.body)
        .then(item => res.status(201).json({
            message: `The playlist #${item.id} has been created`,
            result: item
        }))
        .catch(err => res.status(500).json({ message: err.message }))
})

app.put('/playlist/song/:id/:songId', function (req, res) {
    playlist.insertSong(req.params.id, req.params.songId)
        .then(item => res.status(201).json({
            message: 'Song is added to the playlist',
            result: item
        }))
        .catch(err => res.status(500).json({ message: err.message }))
})

app.delete('/playlist/song/:id/:songId', function (req, res) {
    playlist.deleteSong(req.params.id, req.params.songId)
        .then(item => res.status(201).json({
            message: 'Song is delete to the playlist',
            result: item
        }))
        .catch(err => res.status(500).json({ message: err.message }))
})

app.listen('3434')