import mongoose from "mongoose"; 
import colors from 'colors'

//Replace your MONGO_URL 
const MONGO_URL = 'mongodb+srv://<username>:<password>@cluster0.ly9wzoi.mongodb.net/'

const connectDB = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URL);
      console.log(
        `Conneted To Mongodb Databse ${conn.connection.host}`.bgMagenta.white
      );
    } catch (error) {
      console.log(`Error in Mongodb ${error}`.bgRed.white);
    }
  };
export default connectDB;