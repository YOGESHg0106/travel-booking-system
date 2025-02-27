import BookingsList from "../components/BookingsList";
import Navbar from "../components/Navbar";

export default function BookingView() {
  return (
    <>
      <Navbar />
      <div className="container">
        <h2>Bookings List</h2>
        <BookingsList />
      </div>
    </>
  );
}
