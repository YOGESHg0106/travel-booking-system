import { useQuery, useMutation } from "@apollo/client";
import {
  GET_BOOKINGS,
  DELETE_BOOKING,
  UPDATE_BOOKING,
} from "../graphql/queries";
import { useState } from "react";

export default function BookingsList() {
  const { loading, error, data } = useQuery(GET_BOOKINGS);
  const [deleteBooking] = useMutation(DELETE_BOOKING, {
    refetchQueries: [{ query: GET_BOOKINGS }],
  });
  const [updateBooking] = useMutation(UPDATE_BOOKING, {
    refetchQueries: [{ query: GET_BOOKINGS }],
  });

  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    destination: "",
    date: "",
  });
  const [successMessage, setSuccessMessage] = useState(""); // ✅ Track success messages

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleDelete = async (id) => {
    try {
      if (!id) {
        alert("Failed to delete booking: Invalid ID.");
        return;
      }
      await deleteBooking({ variables: { id } });
      setSuccessMessage("✅ Booking deleted successfully!");
      setTimeout(() => setSuccessMessage(""), 3000); // ✅ Hide after 3s
    } catch (err) {
      alert("Failed to delete booking. Please try again.");
    }
  };

  const handleEdit = (booking) => {
    setEditingId(booking.id);
    setEditData({
      name: booking.name,
      destination: booking.destination,
      date: booking.date,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateBooking({
        variables: {
          id: editingId,
          name: editData.name,
          destination: editData.destination,
          date: editData.date,
        },
      });
      setEditingId(null);
      setSuccessMessage("✅ Booking updated successfully!");
      setTimeout(() => setSuccessMessage(""), 3000); // ✅ Hide after 3s
    } catch (err) {
      alert("Failed to update booking. Please check your input.");
    }
  };

  return (
    <div>
      {successMessage && <p className="success-message">{successMessage}</p>}{" "}
      {/* ✅ Show message */}
      <ul className="booking-list">
        {data.getBookings.map((booking) => (
          <li key={booking.id} className="booking-item">
            {editingId === booking.id ? (
              <form onSubmit={handleUpdate}>
                <input
                  value={editData.name}
                  onChange={(e) =>
                    setEditData({ ...editData, name: e.target.value })
                  }
                  required
                />
                <input
                  value={editData.destination}
                  onChange={(e) =>
                    setEditData({ ...editData, destination: e.target.value })
                  }
                  required
                />
                <input
                  type="date"
                  value={editData.date}
                  onChange={(e) =>
                    setEditData({ ...editData, date: e.target.value })
                  }
                  required
                />
                <button type="submit" className="edit-btn">
                  Save
                </button>
              </form>
            ) : (
              <>
                <strong>{booking.name}</strong> - {booking.destination} (
                {booking.date})
                <div className="booking-actions">
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(booking)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(booking.id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
