import { gql } from "@apollo/client";

export const GET_BOOKINGS = gql`
  query GetBookings {
    getBookings {
      id
      name
      destination
      date
    }
  }
`;

export const ADD_BOOKING = gql`
  mutation AddBooking($name: String!, $destination: String!, $date: String!) {
    addBooking(name: $name, destination: $destination, date: $date) {
      id
      name
      destination
      date
    }
  }
`;

export const DELETE_BOOKING = gql`
  mutation DeleteBooking($id: ID!) {
    deleteBooking(id: $id) {
      # ✅ Expect full booking, not just ID
      id
      name
      destination
      date
    }
  }
`;

export const UPDATE_BOOKING = gql`
  mutation UpdateBooking(
    $id: ID!
    $name: String!
    $destination: String!
    $date: String!
  ) {
    updateBooking(
      id: $id
      name: $name
      destination: $destination
      date: $date
    ) {
      id
      name
      destination
      date
    }
  }
`;
