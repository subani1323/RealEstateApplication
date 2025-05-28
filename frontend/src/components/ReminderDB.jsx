// src/components/ReminderDB.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const ReminderDB = () => {
  const [reminders, setReminders] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editDate, setEditDate] = useState("");
  const [editReminder, setEditReminder] = useState("");

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

  const deleteReminder = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/reminders/${id}`);
      setReminders((prev) => prev.filter((rem) => rem._id !== id));
      alert("Reminder deleted successfully");
    } catch (error) {
      console.error("Error deleting reminder:", error);
      alert("Failed to delete reminder");
    }
  };

  const startEdit = (reminder) => {
    setEditingId(reminder._id);
    const [month, day, year] = reminder.date.split("/");
    setEditDate(`${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`);
    setEditReminder(reminder.reminder);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditDate("");
    setEditReminder("");
  };

  const saveEdit = async (id) => {
    if (!editDate || !editReminder.trim()) {
      alert("Please fill out both fields.");
      return;
    }

    try {
      const d = new Date(editDate);
      const formattedDate = [
        ("0" + (d.getMonth() + 1)).slice(-2),
        ("0" + d.getDate()).slice(-2),
        d.getFullYear(),
      ].join("/");

      await axios.put(`http://localhost:5001/api/reminders/${id}`, {
        date: formattedDate,
        reminder: editReminder,
      });

      alert("Reminder updated successfully");
      cancelEdit();
      fetchReminders();
    } catch (error) {
      console.error("Error updating reminder:", error);
      alert("Failed to update reminder");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="p-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-semibold mb-6 text-gray-700 text-center">
          All Reminders Database
        </h2>

        <table className="min-w-full bg-white rounded-md shadow-md">
          <thead>
            <tr>
              <th className="py-3 px-6 bg-yellow-400 text-left text-white font-bold">
                Date
              </th>
              <th className="py-3 px-6 bg-yellow-400 text-left text-white font-bold">
                Reminder
              </th>
              <th className="py-3 px-6 bg-yellow-400 text-center text-white font-bold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {reminders.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center py-6 text-gray-500">
                  No reminders found.
                </td>
              </tr>
            ) : (
              reminders.map((rem) => (
                <tr key={rem._id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-6">
                    {editingId === rem._id ? (
                      <input
                        type="date"
                        value={editDate}
                        onChange={(e) => setEditDate(e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1"
                      />
                    ) : (
                      rem.date
                    )}
                  </td>

                  <td className="py-3 px-6">
                    {editingId === rem._id ? (
                      <input
                        type="text"
                        value={editReminder}
                        onChange={(e) => setEditReminder(e.target.value)}
                        placeholder="Edit reminder..."
                        className="border border-gray-300 rounded px-2 py-1 w-full"
                      />
                    ) : (
                      rem.reminder
                    )}
                  </td>

                  <td className="py-3 px-6 text-center">
                    {editingId === rem._id ? (
                      <>
                        <button
                          onClick={() => saveEdit(rem._id)}
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded mr-2"
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => startEdit(rem)}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() =>
                            window.confirm(
                              "Are you sure you want to delete this reminder?"
                            ) && deleteReminder(rem._id)
                          }
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReminderDB;
