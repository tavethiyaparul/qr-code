const FILE = require("../models/fileModel")
const path = require("path")
const fs = require("fs")

// LimitRequestBody 104857600
module.exports = {
    getFile: async (req, res, next) => {
        try {
            const result = await FILE.find().sort({ createdAt: -1 }).limit(50).skip(0)

            return res.status(200).json({ status: 1, message: "file list", result: result })
        } catch (error) {
            console.log("error", error)
            return res.status(500).json({
                status: 0,
                message: "Internal server error",
                error: JSON.stringify(error),
            })
        }
    },
    deleteFile: async (req, res, next) => {
        try {
            const result = await FILE.findOneAndDelete({ _id: req.params.id })
            const imagePathToDelete = path.join(__dirname, "../uploads", result?.url)
            await deleteImageFromFolder(imagePathToDelete)

            return res.status(200).json({ status: 1, message: "Delete successfully.", result: result })
        } catch (error) {
            console.log("error", error)
            return res.status(500).json({
                status: 0,
                message: "Internal server error",
                error: JSON.stringify(error),
            })
        }
    },
    createFile: async (req, res, next) => {
        try {
            console.log("first===============", req.body)
            const { name } = req.body

            console.log("first", req.files)

            if (!req.files.fileName || !name) {
                return res.status(404).json({ status: 0, message: "Please Enter File or Name" })
            }

            let result = await FILE.create({
                name,
                url: req.files.fileName[0].filename,
            })

            return res.status(200).json({ status: 1, message: "user create", data: result })
        } catch (error) {
            console.log("error", error)
            return res.status(500).json({
                status: 0,
                message: "Internal server error",
                error: JSON.stringify(error),
            })
        }
    },
}

deleteImageFromFolder = (imagePathToDelete) => {
    fs.unlink(imagePathToDelete, (err) => {
        if (err) {
            console.error("Error deleting image from folder:", err)
        } else {
            console.log("Image deleted from folder")
        }
    })
    return
}
