import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/ApiError.js"
import { User } from "../models/user.models.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler( async(req,res) => {
    //  return res.status("200").json({
    //     message: "chai and code"
    //   })

    //STEP TO register a user
    //1.get user detail from frontend
    //2.validate user detail 
    //3. check user already exist or not : username or email or both 
    //4.check for image and check for avatar
    //5. upload them to cloudinary , avatar (necessary)
    //6. create user object - create entry in db
    //7. remove password and refresh token field from response (mongodb send all data passward and token and we did not give both field to user)
    //8.check the user creation 
    //9.return response

    const {username, email, fullName, password} = req.body
    console.log("email : ", email);

    //this is one way 
    /* if (username === '') {
      throw new apiError(409, "username is not empty")
    }*/

    //another way 
   if ( [username, email, password, fullName].some( (ele) => ele?.trim() === '')
   ) {
       throw new apiError(400, "All field are required")
   }

   //user existed using User which is mongodb store

  const existedUser = User.findOne({
    $or: [{username}, {email}]
  })
  console.log("existed user : ", existedUser);
  if (!existedUser) {
    throw new apiError(409, "user or email already existed ")
  }
  
  //4step
  const avatarLocalPath = req.files?.avatar[0]?.path
  const coverImageLocalpath = req.files?.coverImage[0]?.path
  console.log("req files :",req.files);

 if (!avatarLocalPath) {
    throw new apiError(400, "Avatar image is compulsary")
 }

 
 const avatar = uploadOnCloudinary(avatarLocalPath)
 const coverImage = uploadOnCloudinary(coverImageLocalpath)

 //check upload avatar proper 
 if (!avatar) {
    throw new apiError(400, "avatar is not uploaded")
 }

 const user = await User.create(
  {
    username,
    email,
    password, 
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    fullName,
  } )

  //select() method is take element which value we want to remove and accept string
  const createdUser = await User.findById(user._id).select("-password -refreshTokem")

  if (!createdUser) {
     throw new apiError(500, "user creation failed")
  }

  res.status(201).json(
    new ApiResponse(
      200,
      createdUser,
      "user registered successfully"
    )
  )

})

export { registerUser };