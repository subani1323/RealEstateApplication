import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import companyLogo from "../Assets/logo.jpeg";

const LedgerDB = () => {
  const [ledgerData, setLedgerData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLedger = async () => {
      try {
        const response = await fetch(
          "http://localhost:5001/api/general-ledger"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setLedgerData(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchLedger();
  }, []);

  const handleEdit = (id) => {
    alert(`Edit entry with ID: ${id}`);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this entry?"
    );
    if (!confirm) return;

    try {
      const response = await fetch(
        `http://localhost:5001/api/general-ledger/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Failed to delete entry");

      setLedgerData(ledgerData.filter((entry) => entry._id !== id));
    } catch (err) {
      alert("Error deleting entry: " + err.message);
    }
  };

  const handlePrint = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5001/api/general-ledger/${id}`
      );
      const data = await response.json();
      const { _id, __v, ...printData } = data;

      const printWindow = window.open("", "_blank");
      if (!printWindow) return;

      const capitalizedData = Object.entries(printData)
        .map(([key, value]) => {
          const label = key
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase());
          return `<p><strong>${label}:</strong> ${value}</p>`;
        })
        .join("");

      printWindow.document.write(`
        <html>
          <head>
            <title>Ledger Print</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 30px; }
              img { width: 120px; height: auto; }
              .logo { position: absolute; top: 30px; left: 30px; }
              .title { margin-top: 100px; }
              p { margin: 8px 0; }
            </style>
          </head>
          <body>
            <img class="logo" src="${companyLogo}" alt="Company Logo" />
            <h2 class="title">Ledger Entry</h2>
            <div>${capitalizedData}</div>
            <script>
              window.onload = function() {
                window.print();
              };
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    } catch (err) {
      alert("Failed to print: " + err.message);
    }
  };

  if (error) {
    return (
      <div className="text-red-600 p-4">
        Failed to load ledger data: {error}
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-6 px-2 max-w-[95vw]">
        <table className="w-full table-auto border border-gray-300 shadow-md rounded">
          <thead className="bg-yellow-500 text-white">
            <tr>
              <th className="py-2 px-2 text-left">AR Commission Earned</th>
              <th className="py-2 px-2 text-left">
                AP General Commission Expense
              </th>
              <th className="py-2 px-2 text-left">AR Other Debit</th>
              <th className="py-2 px-2 text-left">
                Unpaid File Trust Receivable
              </th>
              <th className="py-2 px-2 text-left">
                Commission Receivable Payable
              </th>
              <th className="py-2 px-2 text-left">
                Held Funds Receivable Agent
              </th>
              <th className="py-2 px-2 text-left">Held Funds Payable Agent</th>
              <th className="py-2 px-2 text-left">Suspense</th>
              <th className="py-2 px-2 text-left">
                Unpaid Expenses Management
              </th>
              <th className="py-2 px-2 text-left">Unpaid Expenses Non Mgmt</th>
              <th className="py-2 px-2 text-left">Payroll Agent</th>
              <th className="py-2 px-2 text-left">Agent Disbursement</th>
              <th className="py-2 px-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {ledgerData.length === 0 ? (
              <tr>
                <td colSpan="13" className="text-center py-6 text-gray-500">
                  No data found
                </td>
              </tr>
            ) : (
              ledgerData.map((entry) => (
                <tr key={entry._id} className="hover:bg-gray-100">
                  <td className="py-1 px-2">{entry.ARCommissionEarned}</td>
                  <td className="py-1 px-2">
                    {entry.APGeneralCommissionExpense}
                  </td>
                  <td className="py-1 px-2">{entry.AROtherDebit}</td>
                  <td className="py-1 px-2">
                    {entry.unpaidFileTrustReceivable}
                  </td>
                  <td className="py-1 px-2">
                    {entry.commissionReceivablePayable}
                  </td>
                  <td className="py-1 px-2">
                    {entry.heldFundsReceivableAgent}
                  </td>
                  <td className="py-1 px-2">{entry.heldFundsPayableAgent}</td>
                  <td className="py-1 px-2">{entry.suspense}</td>
                  <td className="py-1 px-2">
                    {entry.unpaidExpensesManagement}
                  </td>
                  <td className="py-1 px-2">{entry.unpaidExpensesNonMgmt}</td>
                  <td className="py-1 px-2">{entry.payrollAgent}</td>
                  <td className="py-1 px-2">
                    {entry.agentDisbursement ? "Yes" : "No"}
                  </td>
                  <td className="py-1 px-2 whitespace-nowrap space-x-1">
                    <button
                      onClick={() => handleEdit(entry._id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(entry._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handlePrint(entry._id)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded text-xs"
                    >
                      Print
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default LedgerDB;
