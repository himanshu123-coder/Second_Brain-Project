import express from "express";
import jwt from "jsonwebtoken";
import { UserModel , ContentModel , LinkModel } from "./db.js";
import cors from "cors";
import { userMiddleware } from "./middleware.js";
import bcrypt from "bcrypt";
const JWT_SECRET = "s3cret";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/api/v1/signUp", async (req ,res)=> {
    const username = req.body.username;
    const password = req.body.password;
   const hashedPassword = await bcrypt.hash(password,5);

    try{
        
        await UserModel.create({ username: username , password: hashedPassword});
         res.json({
        message: "Signup endpoint",
       });
    }
    catch(e){
        res.status(409).json({
            message : "User already exits"
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
    } else {
        res.status(403).json({ message: "Incorrect credentials" });
    }
});
app.post("/api/v1/content", userMiddleware, async (req, res) => {
    const { link, type, title } = req.body;
    // Create a new content entry linked to the logged-in user.
    await ContentModel.create({
        link,
        type,
        title,
        userId: (req as any).userId,
        tags: []
    });

    res.json({ message: "Content added" }); // Send success response.
});

app.get("/api/v1/content", userMiddleware, async (req, res) => {
    //@ts-ignore
    const userId = req.userId;  // User ID is fetched from middleware
    
    const content = await ContentModel.find({ userId: userId }).populate("userId", "username");
    res.json(content);  // Send the content as response
});

app.delete("/api/v1/content", userMiddleware, async (req, res) => {
    const contentId = req.body.contentId;

    // Delete content based on contentId and userId.
    await ContentModel.deleteMany({ contentId, userId: (req as any).userId });
    res.json({ message: "Deleted" }); // Send success response.
});



app.listen(3000)

