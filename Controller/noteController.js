const Note = require('../model/noteSchema')
const User = require('../model/userScheme')

// Validation Regex for subject
const subjectRegex = /^[a-zA-Z0-9\s]+$/;

// Create Note
const  creatNote = async (req, res) => {
    try {
      const { title, content, subject, createdBy , collaborators } = req.body;
  
      if (!title || !content || !subject) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
  
      // Create a new note instance
      const newNote = new Note({
        title,
        content,
        subject,
        createdBy: createdBy,
        collaborators,  // Assuming this comes from the request body or session
      });
  
      // Save to the database
      await newNote.save();
  
      // Return a success response
      res.status(201).json({ message: 'Note created successfully', note: newNote });
    } catch (err) {
      console.error('Error creating note:', err);
      res.status(500).json({ message: 'An error occurred', error: err.message });
    }
  };
  

// Get All Notes
const getNotes = async (req, res) => {
  try {
    const notes = await Note.find().populate("createdBy lastEditedBy collaborators", "displayName email");
    res.status(200).json({ message: "Notes fetched successfully", notes });
  } catch (err) {
    res.status(500).json({ message: "An error occurred", error: err.message });
  }
};

// Get Note By ID
const  getNoteByUserId = async (req, res) => {
    try {
      const id = req.params.id;
      console.log(id)
      const note = await Note.find({ createdBy: id }).populate("createdBy lastEditedBy collaborators", "displayName email");
      if (!note) {
        return res.status(404).json({ message: "Note not found" });
      }
      res.status(200).json({ message: "Note fetched successfully", note });
    } catch (err) {
      res.status(404).json({ message: "An error occurred", error: err.message });
    }
  };
  

// Update Note
const updateNote = async (req, res) => {
  try {
    const id = req.params.id;
    const updates = {
      ...req.body,
      lastEditedBy: req.body.lastEditedBy,
      lastEditedAt: new Date(),
    };

    const note = await Note.findByIdAndUpdate(id, updates, { new: true });
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({ message: "Note updated successfully", note });
  } catch (err) {
    res.status(500).json({ message: "An error occurred", error: err.message });
  }
};

// Search Notes By Subject
const searchNotesBySubject = async (req, res) => {
    try {
      const { subject } = req.query;
     

      // Optionally, validate the subject format
      const subjectRegex = /^[\w\s&]+$/; // Allow alphanumeric, spaces, and '&'
      if (!subjectRegex.test(subject)) {
        return res.status(400).json({ message: "Invalid subject format" });
      }
  
      // Search notes by subject using case-insensitive regex
      const notes = await Note.find({ subject: new RegExp(subject, "i") });
      console.log("Searching for subject:", subject);
      // If no notes are found, return a 404
      if (notes.length === 0) {
        return res.status(404).json({ message: "No notes found for the given subject" });
      }
  
      // Return the fetched notes
      res.status(200).json({ message: "Notes fetched successfully", notes });
  
    } catch (err) {
      console.error(err);  // Log the error for debugging
      res.status(500).json({ message: "An error occurred", error: err.message });
    }
  };
  

// Delete Note
const deleteNote = async (req, res) => {
  try {
    const id = req.params.id;
    const note = await Note.findByIdAndDelete(id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "An error occurred", error: err.message });
  }
};

module.exports = {
  getNotes,
  creatNote,
  getNoteByUserId,
  deleteNote,
  updateNote,
  searchNotesBySubject,
};
