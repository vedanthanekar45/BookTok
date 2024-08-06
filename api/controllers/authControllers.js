/* This file will be used to handle user authentication */

// Importing modules
import User from "../models/user.js";
import generateTokenandCookie from "../utilities/generateToken.js";
import bcrypt from "bcryptjs" 

// Login Function
export const login = async (req, res) => {
    try {

        // Taking User Inputs from the input fields
        const {userName, password} = req.body;       
        
        // Find the user inside the database
        const user = await User.findOne({userName}); 

        // Decrypt the password using bcrypt and compare them. Whether true or false, will be stored in the isPasswordCorrect variable
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        // If user doesn't exist or the password is incorrect, throw error using status code 400
        if (!user || !isPasswordCorrect) {
            return res.status(400).json({error: "Invalid Username or password"});
        }

        /* Token and cookie are generated for the user if login is successfull. This function isn't built-in.
           It is defined in the generateToken.js file in utilities folder */
        const token = generateTokenandCookie(user._id, res);

        // res.cookie('token', token, {
        //     httpOnly: true,   // Cannot be accessed by client-side JavaScript
        //     secure: process.env.NODE_ENV === 'production', // Cookie sent only over HTTPS
        //     sameSite: 'strict', // Prevent CSRF attacks
        //     maxAge: 60 * 60 * 1000 // 1 hour
        //   });

        // If login is successful, then this will return a Javascript object containing user details
        res.status(201).json({
            _id: user._id,
            token: token,
            firstName: user.firstName,
            lastName: user.lastName,
            userName: user.userName,
            profilePic: user.profilePic
        })
        
        //  If an error occurs by chance in the above processes by any chance, then catch and throw it.
    } catch (error) {
        console.log("Error in login controller: ", error.message)
        res.status(500).json({error: "Internal Server Error"})
    }
}

// SignUp or Registration function
export const signup = async (req, res) => {
    try {

        // Taking User Inputs from the frontend
        const {firstName, lastName, email, userName, password} = req.body;

        // Checking if the username already exists
        const user = await User.findOne({userName});
        if(user) {
            return res.status(400).json({error: "Username already exists"})
        }

        // Encrypting the password using hashing
        const encPassword = await bcrypt.hash(password, 10);

        // Creating user avatar using initials using the ui-avatars API
        const avatarlink = "https://ui-avatars.com/api/?background=random&name="+firstName+"+"+ lastName;

        // Creating a new user
        const newUser = new User({
            firstName,
            lastName,
            userName,
            email,
            password: encPassword,
            profilePic: avatarlink
        })

        // If new user is successfully created then generate tokens and cookie for them
        if (newUser) {
            // Generate JWT Token
            const token = generateTokenandCookie(newUser._id, res);

            // res.cookie('token', token, {
            //     httpOnly: true,   // Cannot be accessed by client-side JavaScript
            //     secure: process.env.NODE_ENV === 'production', // Cookie sent only over HTTPS
            //     sameSite: 'strict', // Prevent CSRF attacks
            //     maxAge: 60 * 60 * 1000 // 1 hour
            // });

            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                token: token,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                userName: newUser.userName,
                profilePic: newUser.profilePic
            })
        } else {
            res.status(400).json({error: "Invalid User Data"})
        }

    } catch (error) {
        console.log("Error in signup controller: ", error.message)
        res.status(500).json({error: "Internal Server Error"})
    }
}

// LogOut function
export const logout = (req, res) => {
    try {
        // To logout, simply set the age of the cookie to zero. If successful, return a message "Logged out successdully".
        res.cookie("jwt", "", {
            maxAge: 0
        });
        res.status(200).json({
            message: "Logged out Successfully"
        });
    } catch (error) {
        console.log("Error in logout controller: ", error.message)
        res.status(500).json({error: "Internal Server Error"})
    }
}