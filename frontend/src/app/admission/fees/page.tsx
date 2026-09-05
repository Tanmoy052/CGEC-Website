"use client";

import React, { useState, useEffect } from "react";
import { FileText, Download, ChevronRight } from "lucide-react";
import Link from "next/link";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { API_URL } from "@/lib/constants";

interface FeeRow {
  id: string | number;
  desc: string;
  cse: string | number;
  core: string | number;
}

interface RawFeeItem {
  id?: string;
  admissionType?: string;
  slNo: string;
  feeHead: string;
  cseEce: string;
  core: string;
}

interface AutoTableDoc extends jsPDF {
  lastAutoTable?: {
    finalY?: number;
  };
}

const DEFAULT_TABLE1: FeeRow[] = [];

const DEFAULT_TABLE2: FeeRow[] = [];

export default function FeesStructurePage() {
  const [table1Data, setTable1Data] = useState<FeeRow[]>(DEFAULT_TABLE1);
  const [table2Data, setTable2Data] = useState<FeeRow[]>(DEFAULT_TABLE2);

  useEffect(() => {
    fetch(`${API_URL}/public/fees`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && Array.isArray(data) && data.length > 0) {
          const reg = data
            .filter((item: RawFeeItem) => item.admissionType === "REGULAR")
            .map((item: RawFeeItem) => ({
              id: item.slNo.toLowerCase() === "total" ? "" : item.slNo,
              desc: item.feeHead,
              cse: item.cseEce,
              core: item.core,
            }));
          const lat = data
            .filter((item: RawFeeItem) => item.admissionType === "LATERAL")
            .map((item: RawFeeItem) => ({
              id: item.slNo.toLowerCase() === "total" ? "" : item.slNo,
              desc: item.feeHead,
              cse: item.cseEce,
              core: item.core,
            }));
          if (reg.length > 0) setTable1Data(reg);
          if (lat.length > 0) setTable2Data(lat);
        }
      })
      .catch(() => {});
  }, []);

  const generatePDF = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Fee Structure for 1st Semester (New Admission) Regular", 14, 15);

    autoTable(doc, {
      head: [["Sl. No.", "Fee Structure", "CSE & ECE (Rs.)", "CE, ME, EE (Rs.)"]],
      body: table1Data.map((row) => [row.id, row.desc, row.cse, row.core]),
      startY: 20,
      theme: "grid",
      headStyles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
        lineWidth: 0.1,
        lineColor: [0, 0, 0],
        fontStyle: "bold",
        fontSize: 9,
      },
      bodyStyles: {
        textColor: [0, 0, 0],
        lineWidth: 0.1,
        lineColor: [0, 0, 0],
        fontSize: 9,
        cellPadding: 1.5,
      },
      columnStyles: {
        0: { cellWidth: 15, halign: "center" },
        1: { cellWidth: "auto" },
        2: { cellWidth: 35, halign: "center" },
        3: { cellWidth: 35, halign: "center" },
      },
      didParseCell: function (data) {
        if (data.row.index === table1Data.length - 1) {
          data.cell.styles.fontStyle = "bold";
        }
      },
    });

    // Note
    const finalY = (doc as AutoTableDoc).lastAutoTable?.finalY || 150;
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    const noteText =
      "** Students having admitted in TFW category need not to pay Tuition Fees. They have to pay as follows: ECE & CSE RS. 8700 /- & CE, ME & EE RS. 8200 /-";
    const splitNote = doc.splitTextToSize(noteText, 180);
    doc.text(splitNote, 14, finalY + 8);

    // Second Table Title
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Fee Structure for 3rd Semester (Lateral Admission)", 14, finalY + 20);

    autoTable(doc, {
      head: [["Sl. No.", "Fee Structure", "CSE & ECE (Rs.)", "CE, ME, EE (Rs.)"]],
      body: table2Data.map((row) => [row.id, row.desc, row.cse, row.core]),
      startY: finalY + 25,
      theme: "grid",
      headStyles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
        lineWidth: 0.1,
        lineColor: [0, 0, 0],
        fontStyle: "bold",
        fontSize: 9,
      },
      bodyStyles: {
        textColor: [0, 0, 0],
        lineWidth: 0.1,
        lineColor: [0, 0, 0],
        fontSize: 9,
        cellPadding: 1.5,
      },
      columnStyles: {
        0: { cellWidth: 15, halign: "center" },
        1: { cellWidth: "auto" },
        2: { cellWidth: 35, halign: "center" },
        3: { cellWidth: 35, halign: "center" },
      },
      didParseCell: function (data) {
        if (data.row.index === table2Data.length - 1) {
          data.cell.styles.fontStyle = "bold";
        }
      },
    });

    doc.save("FEES_STRUCTURE_CGEC.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
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
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm gap-2 cursor-pointer"
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
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-gray-100 text-gray-700 text-[11px] sm:text-sm uppercase tracking-wider">
                  <th className="px-3 sm:px-6 py-3 sm:py-4 font-bold border-b border-gray-200">
                    Sl. No.
                  </th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 font-bold border-b border-gray-200">
                    Fee Structure
                  </th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 font-bold border-b border-gray-200 text-right whitespace-nowrap">
                    CSE & ECE (Rs.)
                  </th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 font-bold border-b border-gray-200 text-right whitespace-nowrap">
                    CE, ME, EE (Rs.)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {table1Data.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-gray-500 font-medium">
                      Fee structure details are currently being updated.
                    </td>
                  </tr>
                ) : (
                  table1Data.map((item, idx) => {
                    const isTotal =
                      String(item.id).toLowerCase() === "total" ||
                      item.desc.toLowerCase() === "total" ||
                      idx === table1Data.length - 1;
                    return (
                      <tr
                        key={idx}
                        className={
                          isTotal
                            ? "bg-blue-50 font-bold text-blue-900"
                            : "hover:bg-blue-50/50 transition-colors"
                        }
                      >
                        <td className="px-3 sm:px-6 py-2.5 sm:py-3 text-gray-500 font-medium">
                          {item.id}
                        </td>
                        <td className={`px-3 sm:px-6 py-2.5 sm:py-3 ${isTotal ? "uppercase" : "text-gray-800"}`}>
                          {item.desc}
                        </td>
                        <td className="px-3 sm:px-6 py-2.5 sm:py-3 text-gray-900 font-bold text-right">
                          {item.cse}
                        </td>
                        <td className="px-3 sm:px-6 py-2.5 sm:py-3 text-gray-900 font-bold text-right">
                          {item.core}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
          <div className="bg-yellow-50 p-4 border-t border-yellow-100 text-sm text-yellow-800">
            <strong>** Note:</strong> Students admitted in TFW category need not
            pay Tuition Fees.
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
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-gray-100 text-gray-700 text-[11px] sm:text-sm uppercase tracking-wider">
                  <th className="px-3 sm:px-6 py-3 sm:py-4 font-bold border-b border-gray-200">
                    Sl. No.
                  </th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 font-bold border-b border-gray-200">
                    Fee Structure
                  </th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 font-bold border-b border-gray-200 text-right whitespace-nowrap">
                    CSE & ECE (Rs.)
                  </th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 font-bold border-b border-gray-200 text-right whitespace-nowrap">
                    CE, ME, EE (Rs.)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {table2Data.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-gray-500 font-medium">
                      Fee structure details are currently being updated.
                    </td>
                  </tr>
                ) : (
                  table2Data.map((item, idx) => {
                    const isTotal =
                      String(item.id).toLowerCase() === "total" ||
                      item.desc.toLowerCase() === "total" ||
                      idx === table2Data.length - 1;
                    return (
                      <tr
                        key={idx}
                        className={
                          isTotal
                            ? "bg-blue-50 font-bold text-blue-900"
                            : "hover:bg-blue-50/50 transition-colors"
                        }
                      >
                        <td className="px-3 sm:px-6 py-2.5 sm:py-3 text-gray-500 font-medium">
                          {item.id}
                        </td>
                        <td className={`px-3 sm:px-6 py-2.5 sm:py-3 ${isTotal ? "uppercase" : "text-gray-800"}`}>
                          {item.desc}
                        </td>
                        <td className="px-3 sm:px-6 py-2.5 sm:py-3 text-gray-900 font-bold text-right">
                          {item.cse}
                        </td>
                        <td className="px-3 sm:px-6 py-2.5 sm:py-3 text-gray-900 font-bold text-right">
                          {item.core}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
