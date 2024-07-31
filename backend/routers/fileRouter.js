const express = require("express")
const router = express.Router()

const controller = require("../controllers/fileController")
const multer = require("multer")
const path = require("path")

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../uploads"))
    },
    filename: (req, file, cb) => {
        if (file.fieldname == "fileName") {
            cb(null, `${new Date().getTime()}_${file.originalname}`)
        }
    },
})

const upload = multer({ storage: fileStorage, limits: { fileSize: 500 * 1024 * 1024 } })
console.log("upload---------- ", upload)

router.post("/file", upload.fields([{ name: "fileName", maxCount: 1 }]), controller.createFile)
router.get("/file", controller.getFile)
router.delete("/file/:id", controller.deleteFile)

module.exports = router
