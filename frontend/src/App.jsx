import { Routes, Route } from "react-router-dom";
import BookingForm from "./pages/BookingForm";
import BookingView from "./pages/BookingView";
import Navbar from "./components/Navbar"; // ✅ Import Navbar

export default function App() {
  return (
    <>
      <Navbar /> {/* ✅ Navbar added here */}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<BookingForm />} />
          <Route path="/bookings" element={<BookingView />} />
        </Routes>
      </div>
    </>
  );
}
