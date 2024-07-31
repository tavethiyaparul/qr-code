const mongoose = require("mongoose")

const fileSchema = mongoose.Schema(
    {
        url: { type: String },
        name: { type: String, trim: true },
    },
    { timestamps: true, versionKey: false }
)

module.exports = mongoose.model("file", fileSchema)
