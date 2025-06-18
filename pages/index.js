// pages/index.js or pages/index.jsx

import React, { useState } from "react";

export default function Home() {
  const [askingPrice, setAskingPrice] = useState(1000000);
  const [monthlyRent, setMonthlyRent] = useState(5000);
  const [interestRate, setInterestRate] = useState(3.5);
  const [serviceCharge, setServiceCharge] = useState(2.0);
  const [maintenanceCharge, setMaintenanceCharge] = useState(3000);
  const [loanTenure, setLoanTenure] = useState(25);
  const [loanRatio] = useState(0.8);

  const loanAmount = askingPrice * loanRatio;
  const downPayment = askingPrice - loanAmount;
  const monthlyInterest = (interestRate / 100) / 12;
  const totalMonths = loanTenure * 12;
  const emi = loanAmount * monthlyInterest * Math.pow(1 + monthlyInterest, totalMonths) / (Math.pow(1 + monthlyInterest, totalMonths) - 1);
  const annualEMI = emi * 12;
  const annualRent = monthlyRent * 12;
  const totalAnnualCharges = (serviceCharge / 100 * askingPrice) + maintenanceCharge;
  const netAnnualIncome = annualRent - totalAnnualCharges - annualEMI;
  const roi = (netAnnualIncome / (downPayment + totalAnnualCharges)) * 100;

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-indigo-100 text-gray-900 px-4 py-8">
      <div className="max-w-5xl mx-auto grid gap-10">
        <h1 className="text-4xl font-extrabold text-indigo-700 text-center">
          🏙️ Dubai Property ROI Calculator
        </h1>

        <section className="bg-white rounded-2xl shadow-lg p-8 space-y-6 border border-indigo-200">
          <h2 className="text-2xl font-semibold text-indigo-600">🏗️ Property & Loan Details</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <Input label="Asking Price (AED)" value={askingPrice} onChange={setAskingPrice} />
            <Input label="Monthly Rent (AED)" value={monthlyRent} onChange={setMonthlyRent} />
            <Input label="Interest Rate (%)" value={interestRate} onChange={setInterestRate} />
            <Input label="Service Charge (%)" value={serviceCharge} onChange={setServiceCharge} />
            <Input label="Maintenance Charge (AED/year)" value={maintenanceCharge} onChange={setMaintenanceCharge} />
            <Input label="Loan Tenure (Years)" value={loanTenure} onChange={setLoanTenure} />
          </div>
        </section>

        <section className="bg-indigo-50 rounded-2xl shadow p-8 space-y-4 border border-indigo-200">
          <h2 className="text-2xl font-semibold text-indigo-700">📈 ROI Summary</h2>
          <ul className="grid sm:grid-cols-2 gap-4 text-lg font-medium">
            <Info label="Loan Amount" value={`AED ${loanAmount.toFixed(0)}`} />
            <Info label="Down Payment" value={`AED ${downPayment.toFixed(0)}`} />
            <Info label="Monthly EMI" value={`AED ${emi.toFixed(0)}`} />
            <Info label="Annual EMI" value={`AED ${annualEMI.toFixed(0)}`} />
            <Info label="Annual Rent" value={`AED ${annualRent.toFixed(0)}`} />
            <Info label="Service + Maintenance Charges" value={`AED ${totalAnnualCharges.toFixed(0)}`} />
            <Info label="Net Annual Income" value={`AED ${netAnnualIncome.toFixed(0)}`} />
            <Info label="ROI" value={`${roi.toFixed(2)}%`} highlight />
          </ul>
        </section>
      </div>
    </main>
  );
}

function Input({ label, value, onChange }) {
  return (
    <label className="block">
      <span className="text-gray-700 font-medium">{label}</span>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-1 block w-full rounded-xl border border-indigo-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none p-2"
      />
    </label>
  );
}

function Info({ label, value, highlight }) {
  return (
    <li className={`p-4 rounded-lg ${highlight ? "bg-indigo-100 text-indigo-800 font-bold" : "bg-white text-gray-700"}`}>
      <span className="block text-sm">{label}</span>
      <span className="text-xl">{value}</span>
    </li>
  );
}
