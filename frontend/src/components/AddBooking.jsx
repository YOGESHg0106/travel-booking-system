import { useMutation } from "@apollo/client";
import { useState } from "react";
import { ADD_BOOKING, GET_BOOKINGS } from "../graphql/queries";

export default function AddBooking() {
  const [name, setName] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // ✅ Success message state

  const [addBooking] = useMutation(ADD_BOOKING, {
    refetchQueries: [{ query: GET_BOOKINGS }],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addBooking({ variables: { name, destination, date } });

      setSuccessMessage("✅ Booking Successful!"); // ✅ Show success message
      setTimeout(() => setSuccessMessage(""), 3000); // ✅ Hide after 3s

      setName(""); // ✅ Clear inputs
      setDestination("");
      setDate("");
    } catch (err) {
      console.error("Booking failed:", err);
      alert("Failed to book. Please try again.");
    }
  };

  return (
    <div className="booking-container">
      {successMessage && <p className="success-message">{successMessage}</p>}{" "}
      {/* ✅ Success message */}
      <form onSubmit={handleSubmit} className="booking-form">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
          required
        />
        <input
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Destination"
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <button type="submit">Book Now</button>
      </form>
    </div>
  );
}
