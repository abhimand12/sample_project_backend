import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse}  from "../utils/ApiResponse.js";

// app.post('/hello', function (req, res) {
//     console.log(JSON.stringify(req.body.hiee) + ' yoooooo');
//     res.send('hello : ' + JSON.stringify(req.body));
//   });
const helloworld=asyncHandler(async (req,res)=>{
    console.log(JSON.stringify(req.body.hiee) + ' yoooooo');
    res.send('hello : ' + JSON.stringify(req.body));
});
const registerUser = asyncHandler( async (req, res) => {
    

    console.log("abhijeet singn");
    const { username,email, role,password } = req.body
    
    console.log(req.body)
    if (
        [username,email, role,password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }
    

    const user = await User.create({
        role,
        email, 
        password,
        username: username
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )

} );


export {registerUser,helloworld};