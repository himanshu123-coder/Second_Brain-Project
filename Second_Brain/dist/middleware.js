const JWT_SECRET = "s3cret"; // Importing the JWT secret key 
import jwt from "jsonwebtoken"; // Importing the jsonwebtoken library for token verification.
// Middleware to validate user authentication using a JWT token.
export const userMiddleware = async (req, res, next) => {
    // Extract the "authorization" header from the request.
    const header = req.headers["authorization"];
    // Verify the JWT token using the secret key.
    const decoded = jwt.verify(header, JWT_SECRET);
    // If the token is successfully decoded, attach the user ID to the request object.
    if (decoded) {
        // @ts-ignore
        req.userId = decoded.id; // Store the decoded user ID for later use in request handling.
        next(); // Call the next middleware or route handler.
    }
    else {
        // If the token is invalid, send a 401 Unauthorized response.
        res.status(401).json({ message: "Unauthorized User" });
    }
};
//# sourceMappingURL=middleware.js.map