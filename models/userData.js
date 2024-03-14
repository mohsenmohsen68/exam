import * as mongoose from 'mongoose';

const schema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    lastname:{
        type:String,
        required: true,
    },
    school:{
        type:String,
    },
    codeMelli:{
        type:String,
        required: true,
    },
    phoneNumber:{
        type:String,
        required: true,
    },
    trueAnswers:{
        type:Number,
    },
})

const UserModel = mongoose.models?.User || mongoose.model("User", schema);
export default UserModel;