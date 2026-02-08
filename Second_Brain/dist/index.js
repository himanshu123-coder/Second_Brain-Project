import express from "express";
import jwt from "jsonwebtoken";
import { UserModel, ContentModel, LinkModel } from "./db.js";
import cors from "cors";
import { userMiddleware } from "./middleware.js";
import bcrypt from "bcrypt";
const JWT_SECRET = "s3cret";
import { random } from "./utils.js";
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
app.post("/api/v1/content", userMiddleware, async (req, res) => {
    const { link, type, title } = req.body;
    // Create a new content entry linked to the logged-in user.
    await ContentModel.create({
        title,
        link,
        type,
        userId: req.userId,
        tags: []
    });
    res.json({ message: "Content added" }); // Send success response.
});
app.get("/api/v1/content", userMiddleware, async (req, res) => {
    //@ts-ignore
    const userId = req.userId; // User ID is fetched from middleware
    const content = await ContentModel.find({ userId: userId }).populate("userId", "username");
    res.json(content); // Send the content as response
});
app.delete("/api/v1/content", userMiddleware, async (req, res) => {
    const contentId = req.body.contentId;
    // Delete content based on contentId and userId.
    await ContentModel.deleteMany({ contentId, userId: req.userId });
    res.json({ message: "Deleted" }); // Send success response.
});
// Route 6: Share Content Link
app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
    const { share } = req.body;
    if (share) {
        // Check if a link already exists for the user.
        const existingLink = await LinkModel.findOne({ userId: req.userId });
        if (existingLink) {
            res.json({ hash: existingLink.hash }); // Send existing hash if found.
            return;
        }
        // Generate a new hash for the shareable link.
        const hash = random(10);
        await LinkModel.create({ userId: req.userId, hash });
        res.json({ hash }); // Send new hash in the response.
    }
    else {
        // Remove the shareable link if share is false.
        await LinkModel.deleteOne({ userId: req.userId });
        res.json({ message: "Removed link" }); // Send success response.
    }
});
// Route 7: Get Shared Content
app.get("/api/v1/brain/:shareLink", async (req, res) => {
    const hash = req.params.shareLink;
    // Find the link using the provided hash.
    const link = await LinkModel.findOne({ hash });
    if (!link) {
        res.status(404).json({ message: "Invalid share link" }); // Send error if not found.
        return;
    }
    // Fetch content and user details for the shareable link.
    const content = await ContentModel.find({ userId: link.userId });
    const user = await UserModel.findOne({ _id: link.userId });
    if (!user) {
        res.status(404).json({ message: "User not found" }); // Handle missing user case.
        return;
    }
    res.json({
        username: user.username,
        content
    }); // Send user and content details in response.
});
app.listen(3000);
//# sourceMappingURL=index.js.map