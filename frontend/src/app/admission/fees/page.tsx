
"use client";

import React from "react";
import { FileText, Download, ChevronRight } from "lucide-react";
import Link from "next/link";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function FeesStructurePage() {
  const generatePDF = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Fee Structure for 1st Semester (New Admission) Regular", 14, 15);

    // Table 1 Data
    const table1Columns = [
      { header: "Sl. No.", dataKey: "id" },
      { header: "Fee Structure", dataKey: "desc" },
      { header: "CSE & ECE (Rs.)", dataKey: "cse" },
      { header: "CE, ME, EE (Rs.)", dataKey: "core" },
    ];

    const table1Data = [
      { id: 1, desc: "Admission Fee (one time)", cse: "1000", core: "500" },
      { id: 2, desc: "Tuition Fee (July 2025 to December 2025)", cse: "6000", core: "3000" },
      { id: 3, desc: "University Development Fee (one time) May change by the order of MAKAUT", cse: "2200", core: "2200" },
      { id: 4, desc: "University Registration Fee (one time) May change by the order of MAKAUT", cse: "500", core: "500" },
      { id: 5, desc: "Caution Money Deposit (Refundable) (one time)", cse: "300", core: "300" },
      { id: 6, desc: "Identity Card & Library Card (one time)", cse: "200", core: "200" },
      { id: 7, desc: "First Aid fee (one time)", cse: "50", core: "50" },
      { id: 8, desc: "Athletic Fee (one time)", cse: "600", core: "600" },
      { id: 9, desc: "Student's Insurance Fee (one time)", cse: "600", core: "600" },
      { id: 10, desc: "Fees Book per book", cse: "50", core: "50" },
      { id: 11, desc: "Library Caution Deposit (Refundable) (one time)", cse: "2000", core: "2000" },
      { id: 12, desc: "Career Pathway Facility Charge", cse: "1200", core: "1200" },
      { id: "", desc: "Total", cse: "14700", core: "11200" }, // Total Row
    ];

    autoTable(doc, {
      head: [["Sl. No.", "Fee Structure", "CSE & ECE (Rs.)", "CE, ME, EE (Rs.)"]],
      body: table1Data.map(row => [row.id, row.desc, row.cse, row.core]),
      startY: 20,
      theme: 'grid',
      headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], lineWidth: 0.1, lineColor: [0, 0, 0], fontStyle: 'bold', fontSize: 9 },
      bodyStyles: { textColor: [0, 0, 0], lineWidth: 0.1, lineColor: [0, 0, 0], fontSize: 9, cellPadding: 1.5 },
      columnStyles: {
        0: { cellWidth: 15, halign: 'center' },
        1: { cellWidth: 'auto' },
        2: { cellWidth: 35, halign: 'center' },
        3: { cellWidth: 35, halign: 'center' },
      },
      didParseCell: function (data) {
         if (data.row.index === table1Data.length - 1) {
             data.cell.styles.fontStyle = 'bold';
         }
      }
    });

    // Note
    const finalY = (doc as any).lastAutoTable.finalY || 150;
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    const noteText = "** Students having admitted in TFW category need not to pay Tuition Fees. They have to pay as follows: ECE & CSE RS. 8700 /- & CE, ME & EE RS. 8200 /-";
    const splitNote = doc.splitTextToSize(noteText, 180);
    doc.text(splitNote, 14, finalY + 8);

    // Second Table Title
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Fee Structure for 3rd Semester (Lateral Admission)", 14, finalY + 20);

    // Table 2 Data
    const table2Data = [
      { id: 1, desc: "Admission Fee (one time)", cse: "1000", core: "500" },
      { id: 2, desc: "Tuition Fee (July 2025 to December 2025)", cse: "6000", core: "3000" },
      { id: 3, desc: "University Development Fee (one time) May change by the order of MAKAUT", cse: "1650", core: "1650" },
      { id: 4, desc: "University Registration Fee (one time) May change by the order of MAKAUT", cse: "500", core: "500" },
      { id: 5, desc: "Caution Money Deposit (Refundable) (one time)", cse: "300", core: "300" },
      { id: 6, desc: "Identity Card & Library Card (one time)", cse: "200", core: "200" },
      { id: 7, desc: "First Aid fee (one time)", cse: "50", core: "50" },
      { id: 8, desc: "Athletic Fee (one time)", cse: "600", core: "600" },
      { id: 9, desc: "Student's Insurance Fee (one time)", cse: "450", core: "450" },
      { id: 10, desc: "Fees Book per book", cse: "50", core: "50" },
      { id: 11, desc: "Library Caution Deposit (Refundable) (one time)", cse: "2000", core: "2000" },
      { id: 12, desc: "Career Pathway Facility Charge", cse: "1200", core: "1200" },
      { id: "", desc: "Total", cse: "14000", core: "10500" },
    ];

    autoTable(doc, {
      head: [["Sl. No.", "Fee Structure", "CSE & ECE (Rs.)", "CE, ME, EE (Rs.)"]],
      body: table2Data.map(row => [row.id, row.desc, row.cse, row.core]),
      startY: finalY + 25,
      theme: 'grid',
      headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], lineWidth: 0.1, lineColor: [0, 0, 0], fontStyle: 'bold', fontSize: 9 },
      bodyStyles: { textColor: [0, 0, 0], lineWidth: 0.1, lineColor: [0, 0, 0], fontSize: 9, cellPadding: 1.5 },
      columnStyles: {
        0: { cellWidth: 15, halign: 'center' },
        1: { cellWidth: 'auto' },
        2: { cellWidth: 35, halign: 'center' },
        3: { cellWidth: 35, halign: 'center' },
      },
      didParseCell: function (data) {
         if (data.row.index === table2Data.length - 1) {
             data.cell.styles.fontStyle = 'bold';
         }
      }
    });

    doc.save("FEES_STRUCTURE_CGEC.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 py-4 mb-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-gray-900">Admission</span>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="font-semibold text-blue-600">Fees Structure</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Fees Structure</h1>
            <p className="text-gray-600 mt-2">
              Detailed fee breakdown for new and lateral admissions.
            </p>
          </div>
          <button
            onClick={generatePDF}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm gap-2"
          >
            <Download className="w-5 h-5" />
            Download PDF
          </button>
        </div>

        {/* Table 1: 1st Semester (New Admission) */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-12">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Fee Structure for 1st Semester (New Admission) Regular
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wider">
                  <th className="px-6 py-4 font-bold border-b border-gray-200">
                    Sl. No.
                  </th>
                  <th className="px-6 py-4 font-bold border-b border-gray-200">
                    Fee Structure
                  </th>
                  <th className="px-6 py-4 font-bold border-b border-gray-200 text-right">
                    CSE & ECE (Rs.)
                  </th>
                  <th className="px-6 py-4 font-bold border-b border-gray-200 text-right">
                    CE, ME, EE (Rs.)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  {
                    id: 1,
                    desc: "Admission Fee (one time)",
                    cse: 1000,
                    core: 500,
                  },
                  {
                    id: 2,
                    desc: "Tuition Fee (July 2025 to December 2025)",
                    cse: 6000,
                    core: 3000,
                  },
                  {
                    id: 3,
                    desc: "University Development Fee (one time) May change by the order of MAKAUT",
                    cse: 2200,
                    core: 2200,
                  },
                  {
                    id: 4,
                    desc: "University Registration Fee (one time) May change by the order of MAKAUT",
                    cse: 500,
                    core: 500,
                  },
                  {
                    id: 5,
                    desc: "Caution Money Deposit (Refundable) (one time)",
                    cse: 300,
                    core: 300,
                  },
                  {
                    id: 6,
                    desc: "Identity Card & Library Card (one time)",
                    cse: 200,
                    core: 200,
                  },
                  { id: 7, desc: "First Aid fee (one time)", cse: 50, core: 50 },
                  {
                    id: 8,
                    desc: "Athletic Fee (one time)",
                    cse: 600,
                    core: 600,
                  },
                  {
                    id: 9,
                    desc: "Student's Insurance Fee (one time)",
                    cse: 600,
                    core: 600,
                  },
                  { id: 10, desc: "Fees Book per book", cse: 50, core: 50 },
                  {
                    id: 11,
                    desc: "Library Caution Deposit (Refundable) (one time)",
                    cse: 2000,
                    core: 2000,
                  },
                  {
                    id: 12,
                    desc: "Career Pathway Facility Charge",
                    cse: 1200,
                    core: 1200,
                  },
                ].map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-blue-50/50 transition-colors"
                  >
                    <td className="px-6 py-3 text-gray-500 font-medium">
                      {item.id}
                    </td>
                    <td className="px-6 py-3 text-gray-800">{item.desc}</td>
                    <td className="px-6 py-3 text-gray-900 font-bold text-right">
                      {item.cse}
                    </td>
                    <td className="px-6 py-3 text-gray-900 font-bold text-right">
                      {item.core}
                    </td>
                  </tr>
                ))}
                <tr className="bg-blue-50 font-bold text-blue-900">
                  <td className="px-6 py-4"></td>
                  <td className="px-6 py-4 uppercase">Total</td>
                  <td className="px-6 py-4 text-right">14700</td>
                  <td className="px-6 py-4 text-right">11200</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-yellow-50 p-4 border-t border-yellow-100 text-sm text-yellow-800">
            <strong>** Note:</strong> Students admitted in TFW category need not
            pay Tuition Fees. They have to pay as follows:{" "}
            <span className="font-bold">ECE & CSE Rs. 8700/-</span> &{" "}
            <span className="font-bold">CE, ME & EE Rs. 8200/-</span>
          </div>
        </div>

        {/* Table 2: 3rd Semester (Lateral Admission) */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Fee Structure for 3rd Semester (Lateral Admission)
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wider">
                  <th className="px-6 py-4 font-bold border-b border-gray-200">
                    Sl. No.
                  </th>
                  <th className="px-6 py-4 font-bold border-b border-gray-200">
                    Fee Structure
                  </th>
                  <th className="px-6 py-4 font-bold border-b border-gray-200 text-right">
                    CSE & ECE (Rs.)
                  </th>
                  <th className="px-6 py-4 font-bold border-b border-gray-200 text-right">
                    CE, ME, EE (Rs.)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  {
                    id: 1,
                    desc: "Admission Fee (one time)",
                    cse: 1000,
                    core: 500,
                  },
                  {
                    id: 2,
                    desc: "Tuition Fee (July 2025 to December 2025)",
                    cse: 6000,
                    core: 3000,
                  },
                  {
                    id: 3,
                    desc: "University Development Fee (one time) May change by the order of MAKAUT",
                    cse: 1650,
                    core: 1650,
                  },
                  {
                    id: 4,
                    desc: "University Registration Fee (one time) May change by the order of MAKAUT",
                    cse: 500,
                    core: 500,
                  },
                  {
                    id: 5,
                    desc: "Caution Money Deposit (Refundable) (one time)",
                    cse: 300,
                    core: 300,
                  },
                  {
                    id: 6,
                    desc: "Identity Card & Library Card (one time)",
                    cse: 200,
                    core: 200,
                  },
                  { id: 7, desc: "First Aid fee (one time)", cse: 50, core: 50 },
                  {
                    id: 8,
                    desc: "Athletic Fee (one time)",
                    cse: 600,
                    core: 600,
                  },
                  {
                    id: 9,
                    desc: "Student's Insurance Fee (one time)",
                    cse: 450,
                    core: 450,
                  },
                  { id: 10, desc: "Fees Book per book", cse: 50, core: 50 },
                  {
                    id: 11,
                    desc: "Library Caution Deposit (Refundable) (one time)",
                    cse: 2000,
                    core: 2000,
                  },
                  {
                    id: 12,
                    desc: "Career Pathway Facility Charge",
                    cse: 1200,
                    core: 1200,
                  },
                ].map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-blue-50/50 transition-colors"
                  >
                    <td className="px-6 py-3 text-gray-500 font-medium">
                      {item.id}
                    </td>
                    <td className="px-6 py-3 text-gray-800">{item.desc}</td>
                    <td className="px-6 py-3 text-gray-900 font-bold text-right">
                      {item.cse}
                    </td>
                    <td className="px-6 py-3 text-gray-900 font-bold text-right">
                      {item.core}
                    </td>
                  </tr>
                ))}
                <tr className="bg-blue-50 font-bold text-blue-900">
                  <td className="px-6 py-4"></td>
                  <td className="px-6 py-4 uppercase">Total</td>
                  <td className="px-6 py-4 text-right">14000</td>
                  <td className="px-6 py-4 text-right">10500</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
