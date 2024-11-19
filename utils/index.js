const bcrypt=require("bcrypt");

//hashpassword
const hashPassword=async(password)=>{
  const saltRounds=10;
  const salts=await bcrypt.genSalt(saltRounds);
  return bcrypt.hash(password,salts);

}
//compare password
const comparePassword=async(password,hashPassword)=>{
  return await bcrypt.compare(password,hashPassword);
}



module.exports={hashPassword,comparePassword}