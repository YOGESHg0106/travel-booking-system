const { gql } = require("apollo-server-express");
const mongoose = require("mongoose");
const Booking = require("../models/Booking");

const typeDefs = gql`
  type Booking {
    id: ID!
    name: String!
    destination: String!
    date: String!
  }

  type Query {
    getBookings: [Booking]
  }

  type Mutation {
    addBooking(name: String!, destination: String!, date: String!): Booking
    deleteBooking(id: ID!): Booking # ✅ Fix: Change return type from ID to Booking
    updateBooking(
      id: ID!
      name: String!
      destination: String!
      date: String!
    ): Booking
  }
`;

const resolvers = {
  Query: {
    getBookings: async () => await Booking.find(),
  },
  Mutation: {
    addBooking: async (_, { name, destination, date }) => {
      const newBooking = new Booking({ name, destination, date });
      return await newBooking.save();
    },

    deleteBooking: async (_, { id }) => {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid Booking ID format");
      }
      const deletedBooking = await Booking.findByIdAndDelete(id);
      if (!deletedBooking) {
        throw new Error("Booking not found");
      }
      return deletedBooking; // ✅ Fix: Return full deleted booking instead of just ID
    },

    updateBooking: async (_, { id, name, destination, date }) => {
      const updatedBooking = await Booking.findByIdAndUpdate(
        id,
        { name, destination, date },
        { new: true }
      );
      if (!updatedBooking) throw new Error("Booking not found!");
      return updatedBooking;
    },
  },
};

module.exports = { typeDefs, resolvers };
