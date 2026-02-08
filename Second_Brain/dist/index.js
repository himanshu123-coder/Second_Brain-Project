import express from "express";
const app = express();
app.get("/", (_req, res) => {
    res.send("Server running 🚀");
});
app.listen(3000, () => {
    console.log("Listening on port 3000");
});
//# sourceMappingURL=index.js.map