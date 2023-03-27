import User from '../model/User.js'
import bcrypt from 'bcryptjs'

//GetAllUser: How many users are there in my database
export const getAllUser = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    console.log(err);
  }

  if (!users) {
    return res.status(404).json({ message: 'No Users found' })
  }
  return res.status(200).json({ users })
}

export const getUser =async(req,res,next)=>{
  const id = req.params.id;
  let user;
  try{
    user=await User.findById(id);
  }catch(err){
    console.log(err);
  }

  if(!user){
    return res.status(400).json({message:"User is not available!"})
  }

  return res.status(200).json({user});

}


//Signup: User signup API
export const signup = async (req, res, next) => {
  const { name, email, password } = req.body
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    console.log(err)
  }

  if (existingUser) {
    return res.status(400).json({ message: 'User is already there!' })
  }

  const hashedPassword=bcrypt.hashSync(password);

  const user = new User({
    name,
    email,
    password:hashedPassword
  })
  try {
    await user.save();
  } catch (err) {
    console.log(err)
  }

  return res.status(201).json({user});
}

// LOGIN API: To login the user
export const login=async (req, res, next)=>{
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    console.log(err);
  }

  if (!existingUser) {
    return res.status(400).json({ message: 'User is Not available!' })
  }
  
  const isPasswordCorrect=bcrypt.compareSync(password,existingUser.password);
  if(!isPasswordCorrect){
    return res.status(400).json({ message: 'Password is not correct!' })
  }

  return res.status(200).json({message:"Logged in Successfully!"})

}