import mongoose from "mongoose";

const dbConnection = async ()=>{
    try {

            await mongoose.connect(process.env.MONGO_DB_URL)
            console.log(`DataBase Connected...`);
        
    } catch (error) {
        console.log(`DataBase connection Error: ${error}`)
    }
}

export default dbConnection;