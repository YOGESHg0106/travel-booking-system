import AddBooking from "../components/AddBooking";
import Navbar from "../components/Navbar";

export default function BookingForm() {
  return (
    <>
      <Navbar />
      <div className="container">
        <h2>Book Your Travel</h2>
        <AddBooking />
      </div>
    </>
  );
}
