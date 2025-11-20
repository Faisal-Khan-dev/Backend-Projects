import express from 'express'
import { addNoteController, delNoteController, getAllNotesController, updateNoteController, draftNoteController, updateProfile } from '../controllers/noteController.js'
import { auth } from '../middle_ware/auth.js'
import upload from '../middle_ware/multer.js'

const notRoute = express.Router()

notRoute.post("/addNote", auth, addNoteController)
notRoute.delete("/:id", auth, delNoteController)
notRoute.get("/getNotes", auth, getAllNotesController)
notRoute.put("/updateNote/:id", auth, updateNoteController)
notRoute.post("/saveDraft", auth, draftNoteController)
notRoute.put("/update-profile", upload.single('profileImage'), updateProfile);

export default notRoute
