const mongoose = require("mongoose")

mongoose
    .connect(process.env.DB_URL)
    .then(() => {
        console.log({ db: process.env.DB_URL })
        console.log(`DB Connected Successfully..`)
    })
    .catch((err) => console.log(`DB Err: ${err}`))
