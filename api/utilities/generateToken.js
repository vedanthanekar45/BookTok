import jwt from "jsonwebtoken";

const generateTokenandCookie = (userID, res) => {
    const token = jwt.sign({userID}, process.env.JWT_SECRET, {
        expiresIn: '5d'
    })

    res.cookie("jwt", token, {
        jwt: token,
        maxAge: 5 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
    });

    return token;
    
}

export default generateTokenandCookie;