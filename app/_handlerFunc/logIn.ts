var jwt = require("jsonwebtoken");

export const logIn = (login: string, password: string) => {
    if (login === process.env.NEXT_PUBLIC_LOGIN && password === process.env.NEXT_PUBLIC_PASSWORD) {

        const token = jwt.sign({ login }, process.env.NEXT_PUBLIC_SECRET_KEY, { expiresIn: "1d" });
        
        return token;
    } else {
        return false;
    }
};
