import React from "react";
import { useNavigate } from "react-router-dom";
import { FaBell, FaUser, FaBoxOpen } from "react-icons/fa";

const databases = [
  {
    id: "reminders",
    name: "Reminders Database",
    icon: <FaBell size={40} className="text-yellow-500" />,
  },
  {
    id: "users",
    name: "Company Profile Database",
    icon: <FaUser size={40} className="text-yellow-500" />,
  },
  {
    id: "products",
    name: "Products Database",
    icon: <FaBoxOpen size={40} className="text-yellow-500" />,
  },
  // Add more database cards here as needed
];

const Database = () => {
  const navigate = useNavigate();

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold mb-10 text-center">Databases</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {databases.map(({ id, name, icon }) => (
          <div
            key={id}
            onClick={() => navigate(`/database/${id}`)}
            className="cursor-pointer flex flex-col items-center justify-center p-8 border rounded-lg shadow-md hover:shadow-xl transition bg-white"
          >
            {icon}
            <h2 className="mt-4 text-xl font-semibold text-center">{name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Database;
