import mongoose from "mongoose"

export const dbConnect = () => {
    mongoose.connect(process.env.MongoURI, {
        dbName: "MERNHospitalWebsite"
    }).then(() => {
        console.log("Connected to db")
    }).catch(err => {
        console.log(err)
    })
}