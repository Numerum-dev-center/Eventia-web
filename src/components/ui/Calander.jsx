import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function CalendarWidget() {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-5">
      <h3 className="font-bold mb-4">Calendrier</h3>

      <Calendar />
    </div>
  );
}