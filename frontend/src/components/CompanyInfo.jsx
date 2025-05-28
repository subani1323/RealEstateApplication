import React, { useState } from "react";
import LedgerModal from "./GeneralLedgerForm";

const cardItems = [
  "General Ledger Account Setup",
  "Miscellaneous Settings",
  "Trade Options Setup",
  "Company Profile",
  "Miscellaneous Entries Setup",
  "MLS Fee Setup",
];

const CompanyInfo = () => {
  const [showModal, setShowModal] = useState(false);

  const handleCardClick = (item) => {
    if (item === "General Ledger Account Setup") {
      setShowModal(true);
    }
  };

  return (
    <div className="px-10 py-16 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
        Company Information
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {cardItems.map((item, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(item)}
            className="bg-white rounded-xl shadow-md hover:shadow-lg p-6 transition-transform transform hover:-translate-y-1 cursor-pointer"
          >
            <p className="text-lg font-medium text-gray-700">{item}</p>
          </div>
        ))}
      </div>

      {showModal && <LedgerModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default CompanyInfo;
