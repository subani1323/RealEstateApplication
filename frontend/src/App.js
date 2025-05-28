import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

// Component imports
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Database from "./components/Database";
import ReminderDB from "./components/ReminderDB";
import CompanyInfoDB from "./components/CompanyInfoDB";
import CompanyInfo from "./components/CompanyInfo";
import TradeInfo from "./components/TradeInfo";
import ListingInfo from "./components/ListingInfo";

import LedgerDB from "./components/LedgerDB";
import MiscellaneousDB from "./components/MiscellaneousDB";
import TradeDB from "./components/TradeDB";
import CompanyProfileDB from "./components/CompanyProfileDB";
import MiscellaneousEntriesDB from "./components/MiscellaneousEntriesDB";
import MLSFeeDB from "./components/MLSFeeDB";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={user ? <Dashboard /> : <Login setUser={setUser} />}
        />
        <Route
          path="/database"
          element={user ? <Database /> : <Navigate to="/" replace />}
        />
        <Route
          path="/database/reminders"
          element={user ? <ReminderDB /> : <Navigate to="/" replace />}
        />
        <Route
          path="/database/users"
          element={user ? <CompanyInfoDB /> : <Navigate to="/" replace />}
        />
        <Route
          path="/company-info"
          element={user ? <CompanyInfo /> : <Navigate to="/" replace />}
        />
        <Route
          path="/trade-info"
          element={user ? <TradeInfo /> : <Navigate to="/" replace />}
        />
        <Route
          path="/listing-info"
          element={user ? <ListingInfo /> : <Navigate to="/" replace />}
        />

        {/* ✅ NEW ROUTES for 6 Company Info Cards */}
        <Route
          path="/ledger-db"
          element={user ? <LedgerDB /> : <Navigate to="/" replace />}
        />
        <Route
          path="/miscellaneous-db"
          element={user ? <MiscellaneousDB /> : <Navigate to="/" replace />}
        />
        <Route
          path="/trade-db"
          element={user ? <TradeDB /> : <Navigate to="/" replace />}
        />
        <Route
          path="/company-profile-db"
          element={user ? <CompanyProfileDB /> : <Navigate to="/" replace />}
        />
        <Route
          path="/miscellaneous-entries-db"
          element={
            user ? <MiscellaneousEntriesDB /> : <Navigate to="/" replace />
          }
        />
        <Route
          path="/mls-fee-db"
          element={user ? <MLSFeeDB /> : <Navigate to="/" replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;
