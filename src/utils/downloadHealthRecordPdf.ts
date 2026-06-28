import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

import { HealthRecordDetails } from "../types/HealthRecord";

const escapeHtml = (value?: string | number | null) =>
  String(value ?? "N/A")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const formatDate = (value?: string) =>
  value ? new Date(value).toLocaleDateString() : "N/A";

export const downloadHealthRecordPdf = async (record: HealthRecordDetails) => {
  const patient = record.patient;
  const fullName = `${patient.firstName ?? ""} ${patient.lastName ?? ""}`.trim();

  const html = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; padding: 24px; color: #0f172a; }
          h1, h2 { margin-bottom: 8px; }
          section { margin-top: 24px; }
          .meta, .card { border: 1px solid #cbd5e1; border-radius: 8px; padding: 12px; margin-top: 10px; }
          .muted { color: #64748b; }
        </style>
      </head>
      <body>
        <h1>${escapeHtml(fullName || "Patient Health Record")}</h1>
        <p class="muted">UHID: ${escapeHtml(patient.patientId)}</p>
        <div class="meta">
          <p>Gender: ${escapeHtml(patient.gender)}</p>
          <p>Blood Group: ${escapeHtml(patient.bloodGroup)}</p>
          <p>Phone: ${escapeHtml(patient.phone)}</p>
        </div>
        <section>
          <h2>Consultations</h2>
          ${record.consultations
            .map(
              (item) => `
                <div class="card">
                  <strong>${formatDate(item.createdAt)}</strong>
                  <p>Diagnosis: ${escapeHtml(item.diagnosis)}</p>
                  <p>Doctor Notes: ${escapeHtml(item.doctorNotes)}</p>
                </div>
              `,
            )
            .join("") || "<p>No consultations available.</p>"}
        </section>
        <section>
          <h2>Lab Reports</h2>
          ${record.labReports
            .map(
              (item) => `
                <div class="card">
                  <strong>${escapeHtml(item.title)}</strong>
                  <p>${escapeHtml(item.reportType)} - ${formatDate(item.reportDate)}</p>
                </div>
              `,
            )
            .join("") || "<p>No lab reports available.</p>"}
        </section>
        <section>
          <h2>Medical Documents</h2>
          ${record.medicalDocuments
            .map(
              (item) => `
                <div class="card">
                  <strong>${escapeHtml(item.title)}</strong>
                  <p>${escapeHtml(item.documentType)} - ${formatDate(item.recordDate)}</p>
                </div>
              `,
            )
            .join("") || "<p>No medical documents available.</p>"}
        </section>
      </body>
    </html>
  `;

  const { uri } = await Print.printToFileAsync({ html });

  if (await Sharing.isAvailableAsync()) {
    await Sharing.shareAsync(uri, {
      mimeType: "application/pdf",
      dialogTitle: "Download complete health record",
    });
  }

  return uri;
};
