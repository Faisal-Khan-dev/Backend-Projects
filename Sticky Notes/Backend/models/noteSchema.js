import mongoose from 'mongoose'

const noteSchema = new mongoose.Schema({
    note: {
        type: String,
        required: true
    }, userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users", 
        required: true
    },
    isDraft: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
})

const NoteModel = mongoose.model("notes", noteSchema)
export default NoteModel;