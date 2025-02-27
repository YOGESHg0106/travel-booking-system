require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");
const connectDB = require("./config/db");
const { typeDefs, resolvers } = require("./graphql/schema");

const app = express();

// ✅ Proper CORS Configuration
app.use(
  cors({
    origin: "https://travel-booking-system-lovat.vercel.app", // Remove trailing '/'
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // ✅ Allow cookies/auth headers if needed
  })
);

connectDB();

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req }), // ✅ Important for handling headers
  });

  await server.start();
  server.applyMiddleware({ app, cors: false }); // ✅ Ensure Apollo doesn't override Express CORS settings

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(
      `🚀 Server running on ${
        process.env.NODE_ENV === "production"
          ? "https://travel-booking-system-backend.vercel.app/graphql"
          : `http://localhost:${PORT}/graphql`
      }`
    );
  });
}

startServer();
