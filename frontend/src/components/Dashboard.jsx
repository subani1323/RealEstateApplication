import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import axios from "axios";
import "react-calendar/dist/Calendar.css";
import Navbar from "./Navbar";
import { FaBuilding, FaList, FaExchangeAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [date, setDate] = useState("");
  const [reminderText, setReminderText] = useState("");
  const [reminders, setReminders] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const navigate = useNavigate(); //  Hook to navigate

  const fetchReminders = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/reminders");
      setReminders(res.data);
    } catch (error) {
      console.error("Error fetching reminders:", error);
    }
  };

  useEffect(() => {
    fetchReminders();
  }, []);

  const formatDate = (dateObj) => {
    const d = new Date(dateObj);
    return [
      ("0" + (d.getMonth() + 1)).slice(-2),
      ("0" + d.getDate()).slice(-2),
      d.getFullYear(),
    ].join("/");
  };

  const addReminder = async (e) => {
    e.preventDefault();
    if (!date || !reminderText.trim()) {
      alert("Please fill both fields");
      return;
    }

    const formattedDate = formatDate(date);
    const trimmedText = reminderText.trim();

    setReminderText("");
    setDate("");

    try {
      await axios.post("http://localhost:5001/api/reminders", {
        date: formattedDate,
        reminder: trimmedText,
      });

      alert("Reminder added!");
      fetchReminders();
    } catch (error) {
      alert("Failed to add reminder");
      console.error(error);
    }
  };

  const clearReminders = () => {
    setReminders([]);
    alert("All reminders cleared from view");
  };

  const filteredReminders = selectedDate
    ? reminders.filter((rem) => rem.date === formatDate(selectedDate))
    : reminders;

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="flex flex-col md:flex-row p-6">
        {/* Calendar Section */}
        <div className="md:flex-1 bg-white rounded-lg shadow-md p-6 mb-8 md:mb-0">
          <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">
            Calendar
          </h2>

          <Calendar
            onClickDay={(value) => setSelectedDate(value)}
            className="mx-auto border-none"
            tileClassName={({ date }) =>
              formatDate(date) === formatDate(selectedDate)
                ? "bg-yellow-300 rounded-lg"
                : ""
            }
          />
        </div>

        {/* Reminder Section */}
        <div className="md:flex-1 bg-white rounded-lg shadow-md p-6 md:ml-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            Add Reminder
          </h2>
          <form onSubmit={addReminder} className="flex flex-col">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 mb-4"
              required
            />
            <textarea
              value={reminderText}
              onChange={(e) => setReminderText(e.target.value)}
              placeholder="Reminder"
              required
              rows={4}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 mb-4 resize-none"
            />
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded-md transition"
            >
              Add Reminder
            </button>
          </form>

          <h2 className="text-2xl font-semibold mt-10 mb-2 text-gray-700">
            {selectedDate
              ? `Reminders for ${formatDate(selectedDate)}`
              : "All Reminders"}
          </h2>
          <ul className="list-disc list-inside max-h-72 overflow-y-auto">
            {filteredReminders.length === 0 ? (
              <p className="text-gray-500">No reminders found.</p>
            ) : (
              filteredReminders.map((rem, index) => (
                <li key={index} className="mb-2">
                  <strong className="text-yellow-600">{rem.date}</strong>:{" "}
                  {rem.reminder}
                </li>
              ))
            )}
          </ul>

          {reminders.length > 0 && (
            <button
              onClick={clearReminders}
              className="mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md"
            >
              Clear Reminders
            </button>
          )}
        </div>
      </div>

      {/* Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 pb-10">
        <div
          className="bg-white shadow-md hover:shadow-lg transition rounded-lg p-6 flex flex-col items-center cursor-pointer"
          onClick={() => navigate("/company-info")}
        >
          <FaBuilding className="text-4xl text-yellow-600 mb-2" />
          <h3 className="text-lg font-semibold text-gray-700">
            Company Profile
          </h3>
        </div>
        <div
          className="bg-white shadow-md hover:shadow-lg transition rounded-lg p-6 flex flex-col items-center cursor-pointer"
          onClick={() => navigate("/listing-info")}
        >
          <FaList className="text-4xl text-yellow-600 mb-2" />
          <h3 className="text-lg font-semibold text-gray-700">Listing Info</h3>
        </div>
        <div
          className="bg-white shadow-md hover:shadow-lg transition rounded-lg p-6 flex flex-col items-center cursor-pointer"
          onClick={() => navigate("/trade-info")}
        >
          <FaExchangeAlt className="text-4xl text-yellow-600 mb-2" />
          <h3 className="text-lg font-semibold text-gray-700">Trade Info</h3>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
