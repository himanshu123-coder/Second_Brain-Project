import express from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "./db.js";
import cors from "cors";
import bcrypt from "bcrypt";
const JWT_SECRET = "s3cret";
const app = express();
app.use(express.json());
app.use(cors());
app.post("/api/v1/signUp", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, 5);
    try {
        await UserModel.create({ username: username, password: hashedPassword });
        res.json({
            message: "Signup endpoint",
        });
    }
    catch (e) {
        res.status(409).json({
            message: "User already exits"
        });
    }
});
app.post("/api/v1/signin", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const response = await UserModel.findOne({ username });
    // Check if user exists before proceeding
    if (!response || !response.password) {
        res.status(403).json({ message: "Incorrect credentials" });
        return;
    }
    const passwordMatch = await bcrypt.compare(password, response.password);
    if (passwordMatch) {
        const token = jwt.sign({ id: response._id }, JWT_SECRET);
        res.json({ token });
    }
    else {
        res.status(403).json({ message: "Incorrect credentials" });
    }
});
app.listen(3000);
//# sourceMappingURL=index.js.map