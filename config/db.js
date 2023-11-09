import mongoose from "mongoose"; 
//import colors from 'colors'

//Replace your MONGO_URL 
const MONGO_URL = 'mongodb+srv://franc:oL9CYNQqKUBwZbte@cluster0.hcigmrs.mongodb.net/?retryWrites=true&w=majority'

const connectDB = async () => {
    try {
      const conn = await mongoose.connect(MONGO_URL);
      console.log(
        `Connected To Mongodb Database`
      );
    } catch (error) {
      console.log(Error);
    }
  };
export default connectDB;