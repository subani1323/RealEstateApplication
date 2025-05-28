import React from "react";
import { useNavigate } from "react-router-dom";

const CompanyInfoDB = () => {
  const navigate = useNavigate();

  const cardData = [
    { title: "General Ledger Account Setup", path: "/ledger-db" },
    { title: "Miscellaneous Settings", path: "/miscellaneous-db" },
    { title: "Trade Options Setup", path: "/trade-db" },
    { title: "Company Profile", path: "/company-profile-db" },
    { title: "Miscellaneous Entries Setup", path: "/miscellaneous-entries-db" },
    { title: "MLS Fee Setup", path: "/mls-fee-db" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-16">
      <h1 className="text-3xl font-bold text-center mb-12 text-gray-800">
        Company Information
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-xl p-6 cursor-pointer hover:scale-105 transition-transform duration-300 hover:bg-yellow-300"
            onClick={() => navigate(card.path)}
          >
            <h3 className="text-lg font-semibold text-gray-800 text-center">
              {card.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyInfoDB;
