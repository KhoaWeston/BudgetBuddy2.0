import mongoose from "mongoose"; 
//import colors from 'colors'

// our mongodb url
const MONGO_URL = 'mongodb+srv://franc:oL9CYNQqKUBwZbte@cluster0.hcigmrs.mongodb.net/?retryWrites=true&w=majority'

const connectDB = async () => {
    try {
      const conn = await mongoose.connect(MONGO_URL);  // connects our database to our app
      console.log(
        `Connected To Mongodb Database`
      );
    } catch (error) {
      console.log(Error); // reports error if not connected
    }
  };
export default connectDB;