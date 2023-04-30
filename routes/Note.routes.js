const express = require("express")
const { NoteModel } = require("../models/Note.model")

const notesRouter = express.Router()

notesRouter.post("/create", async (req, res) => {
    try {
        const note = new NoteModel(req.body)
        await note.save()
        res.status(200).send({ "msg": "New Note Is Added Successfully" })
    } catch (error) {
        res.status(400).send({ "err": error.message })
    }
})

notesRouter.get("/", async (req, res) => {
    try {
        const note = await NoteModel.find({ authorID: req.body.authorID })
        res.status(200).send(note)
    } catch (error) {
        res.status(400).send({ "err": error.message })
    }
})

notesRouter.patch("/update/:noteID", async (req, res) => {
    const { noteID } = req.params
    const note = await NoteModel.findOne({ _id: noteID })
    try {
        if (req.body.authorID !== note.authorID) {
            res.status(200).send({ "msg": "You are not authorised to do this action." })
        } else {
            await NoteModel.findByIdAndUpdate({ _id: noteID }, req.body)
            res.status(200).send({ "msg": "Note Is Edited Successfully" })
        }
    } catch (error) {
        res.status(400).send({ "err": error.message })
    }
})

notesRouter.delete("/delete/:noteID", async (req, res) => {
    const { noteID } = req.params
    const note = await NoteModel.findOne({ _id: noteID })
    try {
        if (req.body.authorID !== note.authorID) {
            res.status(200).send({ "msg": "You are not authorised to do this action." })
        }
        else {
            await NoteModel.findByIdAndDelete({ _id: noteID })
            res.status(200).send({ "msg": "Note Is Deleted Successfully" })
        }

    } catch (error) {
        res.status(400).send({ "err": error.message })
    }
})

module.exports = { notesRouter }