const mongoose  = require('mongoose')


const connectToDB = async()=>{
    try{
        if(mongoose.connections[0].readyState){
        return false
        }
        await mongoose.connect("mongodb://127.0.0.1:27017/ProgrammingExam")
        .then(() => console.log('db connected'))
    
    }
    catch(err){
    console.log(err)
    }
}

export default connectToDB