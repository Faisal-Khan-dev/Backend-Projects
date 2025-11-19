import NoteModel from "../models/noteSchema.js";

export const addNoteController = async (req, res) => {
    try {

        const { note } = req.body
        console.log("note", note);


        if (!note) {
            return res.json({
                message: "Note content is required!",
                status: false,
            });
        }

        const userId = req.user._id;
        console.log("userId", userId);

        const delDraft = await NoteModel.deleteOne({ userId, isDraft: true });
        console.log("delDraft", delDraft);

        const newNote = await NoteModel.create({ note, userId, });
        console.log("newNote", newNote);

        res.json({
            message: "Note successfully created!",
            status: true,
            data: newNote,
        })

    } catch (error) {
        res.json({
            message: error.message || "something went wrong!",
            status: false
        })
    }
}

export const delNoteController = async (req, res) => {
    try {

        const userId = req.params.id
        console.log("userId", userId);

        await NoteModel.findByIdAndDelete(userId)
        res.json({
            message: "Successfully deleted!",
            status: true,
        })

    } catch (error) {
        res.json({
            message: error.message || "something went wrong",
            status: false
        })
    }

}

export const getAllNotesController = async (req, res) => {
    try {

        const userId = req.user._id
        console.log("userId", userId);

        const notes = await NoteModel.find({ userId, isDraft: false })
        console.log("notes", notes);

        const draft = await NoteModel.findOne({ userId, isDraft: true });
        console.log("draft", draft);

        res.json({
            message: "Successfully get all notes!",
            status: true,
            notes: notes,
            draft: draft
        })

    } catch (error) {
        res.json({
            message: error.message || "something went wrong",
            status: false
        })
    }

}

export const updateNoteController = async (req, res) => {
    
    try {
        const noteId = req.params.id
        console.log("noteId", noteId);
        
        const { note } = req.body;
        const userId = req.user._id
        
        if (!note) {
            return res.json({
                message: "Note content is required to update!",
                status: false,
            });
        }

        const updatedNote = await NoteModel.findOneAndUpdate(
            { _id: noteId, userId },
            { note },
            { new: true }

        );

        if (!updatedNote) {
            return res.json({
                message: "Note not found or unauthorized!",
                status: false,
            });
        }

        res.json({
            message: "Note updated successfuly!",
            data: updatedNote,
            status: true
        })

    } catch (error) {
        res.json({
            message: error.message || "something went wrong",
            status: false
        })

    };

}

export const draftNoteController = async (req, res) => {
                try {
            
                    const { note } = req.body
                    console.log("note", note);
            
                    const userId = req.user._id;
                    console.log("userId", userId);
            
                    if (!note || !note.trim()) {
                        return res.json({
                            message: "Empty draft not saved",
                            status: false,
                        });
                    }
            
                    const draft = await NoteModel.findOne({ userId, isDraft: true });
                    console.log(draft);
            
                    if (draft) {
                        const delDraft = await NoteModel.deleteOne({ userId, isDraft: true });
                        console.log("delDraft", delDraft);
                    }
            
                    const draftNote = await NoteModel.create({ note, userId, isDraft: true });
                    console.log("draftNote", draftNote);
            
                    res.json({
                        message: "Draft saved",
                        status: true,
                        data: draftNote
                    });
            
                } catch (error) {
                    res.json({
                        message: error.message || "something went wrong",
                        status: false
                    })
                }
            
            }