import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  useNavigation,
} from "@react-navigation/native";

import {
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";

import GlassCard from "../components/cards/GlassCard";
import StatCard from "../components/cards/StatCard";

import HealthRecordTabs, {
  HealthRecordTab,
} from "../components/health-records/HealthRecordTabs";
    import {
  getFileUrl,
} from "../utils/fileUrl";

import TimelineCard from "../components/health-records/TimelineCard";
import PrescriptionCard from "../components/health-records/PrescriptionCard";
import LabReportCard from "../components/health-records/LabReportCard";
import MedicalDocumentCard from "../components/health-records/MedicalDocumentCard";
import {
  downloadPrescriptionPdf,
} from "../utils/downloadPrescriptionPdf";
import useHealthRecords from "../hooks/useHealthRecords";

import {
  PrescriptionGroup,
  LabReport,
  MedicalDocument,
} from "../types/HealthRecord";

import {
  RootStackParamList,
} from "../types/navigation";
import {
  openPdf,
} from "../utils/openPdf";
import {
  downloadFile,
} from "../utils/downloadFile";

export default function HealthRecordScreen() {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList>
    >();

  const {
    healthRecord,
    loading,
    loadHealthRecord,
  } =
    useHealthRecords();

  const [
    activeTab,
    setActiveTab,
  ] =
    useState<HealthRecordTab>(
      "TIMELINE",
    );

  useEffect(() => {
    loadHealthRecord();
  }, [
    loadHealthRecord,
  ]);

  const prescriptions =
    useMemo(() => {
      return (
        healthRecord?.consultations
          .filter(
            (
              consultation,
            ) =>
              consultation
                .prescriptions
                ?.length,
          )
         .map(
  (
    consultation,
  ) => ({
    consultationId:
      consultation._id,

    doctor:
      consultation
        .doctorEmployeeId
        ?.name,

    department:
      consultation
        .doctorEmployeeId
        ?.department,

    specialization:
      consultation
        .doctorEmployeeId
        ?.specialization,

    date:
      consultation.createdAt,

    diagnosis:
      consultation.diagnosis,

    symptoms:
      consultation.symptoms,

    doctorNotes:
      consultation.doctorNotes,

    vitals:
      consultation.vitals,

    prescriptions:
      consultation.prescriptions,
  }),
) ?? []
      );
    }, [healthRecord]);

const handleViewPrescription =
  (
    prescription:
      PrescriptionGroup,
  ) => {
    navigation.navigate(
      "PrescriptionDetails",
      {
        prescription,
      },
    );
  };

const handleDownloadPrescription =
  async (
    prescription:
      PrescriptionGroup,
  ) => {
    await downloadPrescriptionPdf(
      prescription,
    );
  };
const handleViewReport =
  async (
    report: LabReport,
  ) => {
    const url =
      getFileUrl(
        report.documentUrl,
      );

    if (!url) {
      return;
    }

    await openPdf(
      url,
      `${report.title}.pdf`,
    );
  };

const handleDownloadReport =
  async (
    report:
      LabReport,
  ) => {
    if (
      !report.documentUrl
    ) {
      return;
    }

const url =
  getFileUrl(
    report.documentUrl,
  );

if (!url) {
  return;
}

console.log(url);

await downloadFile(
  url,
  `${report.title}.pdf`,
);
  };
const handleViewDocument =
  async (
    document:
      MedicalDocument,
  ) => {
    const url =
      getFileUrl(
        document.documentUrl,
      );

    if (!url) {
      return;
    }

    await openPdf(
      url,
      `${document.title}.pdf`,
    );
  };

const handleDownloadDocument =
  async (
    document:
      MedicalDocument,
  ) => {
    const url =
      getFileUrl(
        document.documentUrl,
      );

    if (!url) {
      return;
    }

    await downloadFile(
      url,
      `${document.title}.pdf`,
    );
  };
  if (loading) {
    return (
      <View
        style={
          styles.loaderContainer
        }
      >
        <ActivityIndicator
          size="large"
          color="#2563EB"
        />
      </View>
    );
  }

  if (!healthRecord) {
    return (
      <View
        style={
          styles.loaderContainer
        }
      >
        <Text>
          No health records
          found
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={
        styles.container
      }
      showsVerticalScrollIndicator={
        false
      }
    >
      <Text
        style={
          styles.heading
        }
      >
        Health Records
      </Text>

      <View
        style={
          styles.statsRow
        }
      >
        <StatCard
          title="Visits"
          value={
            healthRecord.meta
              .consultations
              .totalRecords
          }
        />

        <StatCard
          title="Reports"
          value={
            healthRecord.meta
              .labReports
              .totalRecords
          }
        />

        <StatCard
          title="Documents"
          value={
            healthRecord.meta
              .medicalDocuments
              .totalRecords
          }
        />
      </View>

      <GlassCard>
        <HealthRecordTabs
          activeTab={
            activeTab
          }
          onChange={
            setActiveTab
          }
        />

        {activeTab ===
          "TIMELINE" && (
          <>
            {healthRecord
              .consultations
              .length ===
            0 ? (
              <Text
                style={
                  styles.emptyText
                }
              >
                No consultations
                found
              </Text>
            ) : (
              healthRecord.consultations.map(
                (
                  consultation,
                ) => (
                  <TimelineCard
                    key={
                      consultation._id
                    }
                    consultation={
                      consultation
                    }
                  />
                ),
              )
            )}
          </>
        )}

        {activeTab ===
          "PRESCRIPTIONS" && (
          <>
            {prescriptions.length ===
            0 ? (
              <Text
                style={
                  styles.emptyText
                }
              >
                No prescriptions
                found
              </Text>
            ) : (
              prescriptions.map(
                (
                  item,
                ) => (
                  <PrescriptionCard
                    key={
                      item.consultationId
                    }
                    item={
                      item
                    }
                    onView={
                      handleViewPrescription
                    }
                    onDownload={
                      handleDownloadPrescription
                    }
                  />
                ),
              )
            )}
          </>
        )}

       {activeTab ===
  "REPORTS" && (
  <>
    {healthRecord.labReports
      .length === 0 ? (
      <Text
        style={
          styles.emptyText
        }
      >
        No reports found
      </Text>
    ) : (
      healthRecord.labReports.map(
        (
          report,
        ) => (
          <LabReportCard
            key={
              report._id
            }
            report={
              report
            }
            onView={
              handleViewReport
            }
            onDownload={
              handleDownloadReport
            }
          />
        ),
      )
    )}
  </>
)}
{activeTab ===
  "DOCUMENTS" && (
  <>
    {healthRecord
      .medicalDocuments
      .length ===
    0 ? (
      <Text
        style={
          styles.emptyText
        }
      >
        No documents found
      </Text>
    ) : (
      healthRecord.medicalDocuments.map(
        (
          document,
        ) => (
          <MedicalDocumentCard
            key={
              document._id
            }
            document={
              document
            }
            onView={
              handleViewDocument
            }
            onDownload={
              handleDownloadDocument
            }
          />
        ),
      )
    )}
  </>
)}
      </GlassCard>
    </ScrollView>
  );
}

const styles =
  StyleSheet.create({
    container: {
      padding: 16,
      paddingBottom: 120,
    },

    loaderContainer: {
      flex: 1,
      justifyContent:
        "center",
      alignItems:
        "center",
    },

    heading: {
      fontSize: 28,
      fontWeight:
        "700",
      color:
        "#0F172A",
      marginBottom: 20,
    },

    statsRow: {
      flexDirection:
        "row",
      justifyContent:
        "space-between",
      marginBottom: 20,
    },

    emptyText: {
      textAlign:
        "center",
      color:
        "#64748B",
      marginTop: 40,
      marginBottom: 20,
      fontSize: 16,
    },
  });