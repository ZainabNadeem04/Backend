const express = require('express')
const {validateToken} = require('../helper/jwt')
const {
  creatNote,
  getNoteByUserId,
  deleteNote,
  updateNote,
  getNotes,
  searchNotesBySubject
} = require('../Controller/noteController')

const routes = express.Router()

// Routes
routes.post('/',validateToken , creatNote)
routes.get('/', getNotes)
routes.get('/:id', getNoteByUserId)
routes.delete('/:id',validateToken , deleteNote)
routes.patch('/:id', validateToken ,updateNote)
routes.get('/search', searchNotesBySubject)

module.exports = routes
