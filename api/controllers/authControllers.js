import User from "../models/user.js";
import generateTokenandCookie from "../utilities/generateToken.js";
import bcrypt from "bcryptjs" 

export const login = async (req, res) => {
    try {
        const {userName, password} = req.body;
        const user = await User.findOne({userName});
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if (!user || !isPasswordCorrect) {
            return res.status(400).json({error: "Invalid Username or password"});
        }

        generateTokenandCookie(user._id, res);
        res.status(201).json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            userName: user.userName,
            profilePic: user.profilePic
        })

    } catch (error) {
        console.log("Error in login controller: ", error.message)
        res.status(500).json({error: "Internal Server Error"})
    }
}

export const signup = async (req, res) => {
    try {
        const {firstName, lastName, userName, email, password} = req.body;

        // Checking if the username already exists
        const user = await User.findOne({userName});
        if(user) {
            return res.status(400).json({error: "Username already exists"})
        }

        // Encrypting the password using hashing
        const encPassword = await bcrypt.hash(password, 10);

        // Creating user avatar using initials
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

        if (newUser) {

            // Generate JWT Token
            generateTokenandCookie(newUser._id, res);
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
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

export const logout = (req, res) => {
    try {
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