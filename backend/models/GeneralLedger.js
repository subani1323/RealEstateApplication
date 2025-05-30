// models/GeneralLedger.js
const mongoose = require("mongoose");

const GeneralLedgerSchema = new mongoose.Schema({
  ARCommissionEarned: { type: String, required: true },
  APGeneralCommissionExpense: { type: String, required: true },
  AROtherDebit: { type: String, required: true },
  unpaidFileTrustReceivable: { type: String, required: true },
  commissionReceivablePayable: { type: String, required: true },
  heldFundsReceivableAgent: { type: String, required: true },
  heldFundsPayableAgent: { type: String, required: true },
  suspense: { type: String, required: true },
  unpaidExpensesManagement: { type: String, required: true },
  unpaidExpensesNonMgmt: { type: String, required: true },
  payrollAgent: { type: String, required: true },
  agentDisbursement: { type: Boolean, required: true },
});

module.exports = mongoose.model("GeneralLedger", GeneralLedgerSchema);
