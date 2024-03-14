import UserModel from "@/models/userData"
import connectToDB from "./../../../utils/connectToDB";
const handler = async(req,res)=>{
connectToDB();
console.log(req.body)
if(req.method === 'POST'){
    const {
        name,
        lastname,
        school,
        codeMelli,
        phoneNumber,
      } = req.body;
      console.log(req.body)
      if (
        !name.trim() ||
        !lastname.trim() ||
        !codeMelli.trim() ||
        !phoneNumber.trim()
      ) {
        return res.status(422).json({message:"داده ها نامعتبرند!", value:'false'});
      }
      //existance of this username
      const isUserExist =await UserModel.findOne({codeMelli})
      console.log(isUserExist)
      if(isUserExist)
      {
          return res.status(422).json({message:'شما قبلا در امتحان شرکت کرده اید.', value: "false"})
      }
      
      //create user
      await UserModel.create({
        name,
        lastname,
        school,
        codeMelli,
        phoneNumber,
      });
      return res
        .status(201)
        .json({ message: "اطلاعات شما ثبت گردید ...", value: "true" });
    }
}

export default handler;

