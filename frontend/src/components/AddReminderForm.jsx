// src/components/AddReminderForm.jsx
import React, { useState } from "react";
import axios from "axios";

const AddReminderForm = ({ onAdd }) => {
  const [date, setDate] = useState("");
  const [reminder, setReminder] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!date || !reminder.trim()) {
      alert("Both fields are required.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5001/api/reminders", {
        date,
        reminder,
      });
      alert("Reminder added!");
      onAdd(res.data); // update dashboard state
      setDate("");
      setReminder("");
    } catch (error) {
      alert("Failed to add reminder.");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow-md rounded-md">
      <div className="mb-2">
        <label className="block mb-1 text-gray-700">Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border px-2 py-1 rounded w-full"
        />
      </div>
      <div className="mb-2">
        <label className="block mb-1 text-gray-700">Reminder:</label>
        <input
          type="text"
          value={reminder}
          onChange={(e) => setReminder(e.target.value)}
          placeholder="Enter reminder"
          className="border px-2 py-1 rounded w-full"
        />
      </div>
      <button
        type="submit"
        className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600"
      >
        Add Reminder
      </button>
    </form>
  );
};

export default AddReminderForm;
