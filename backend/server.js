require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");
const connectDB = require("./config/db");
const { typeDefs, resolvers } = require("./graphql/schema");

const app = express();
app.use(
  cors({
    origin:
      "https://travel-booking-system-7v42uea2y-yogesh-s-projects-f4fa46e2.vercel.app", // ✅ Correct frontend URL
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

connectDB();

async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(
      `🚀 Server running on ${
        process.env.NODE_ENV === "production"
          ? "https://travel-booking-system-backend-fugqb5o3q.vercel.app/graphql"
          : `http://localhost:${PORT}/graphql`
      }`
    );
  });
}

startServer();
