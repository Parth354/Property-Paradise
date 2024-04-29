import mongoose from "mongoose";
let connected =false;

const connectDB= async ()=>{
    mongoose.set('strictQuery',true) // only those items specified get passsed

    //don't connect again if already connected
    if(connected){
        console.log('MongoDB Connected')
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        connected=true;
        console.log('MongoDB Connected...')
    } catch (error) {
    console.log(error)    
    }
}
export default connectDB;