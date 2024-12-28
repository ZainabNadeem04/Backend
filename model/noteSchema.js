const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  subject: {
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  lastEditedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  lastEditedAt: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  collaborators: Array,
})

module.exports = mongoose.model('Note', noteSchema)
