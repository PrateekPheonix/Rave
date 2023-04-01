import mongoose from "mongoose";

const connect = (url) => {
    mongoose.set('strictQuery', true)

    mongoose.connect(url, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }).then(() => {
        console.log("Conneced to DB")
    }).catch((err) => {
        console.log("Error in establishing connection with DB", err)
    })
}

export default connect