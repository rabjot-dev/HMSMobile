import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
  RefreshControl,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Pagination from "../components/common/Pagination";
import GlassCard from "../components/cards/GlassCard";
import StatCard from "../components/cards/StatCard";
import EmptyState from "../components/common/EmptyState";
import HealthRecordTabs, {
  HealthRecordTab,
} from "../components/health-records/HealthRecordTabs";
import { getFileUrl } from "../utils/fileUrl";
import CardSkeleton from "../components/loaders/CardSkeleton";
import TimelineCard from "../components/health-records/TimelineCard";
import PrescriptionCard from "../components/health-records/PrescriptionCard";
import LabReportCard from "../components/health-records/LabReportCard";
import MedicalDocumentCard from "../components/health-records/MedicalDocumentCard";
import { downloadPrescriptionPdf } from "../utils/downloadPrescriptionPdf";
import useHealthRecords from "../hooks/useHealthRecords";

import {
  PrescriptionGroup,
  LabReport,
  MedicalDocument,
} from "../types/HealthRecord";

import { RootStackParamList } from "../types/navigation";
import { openPdf } from "../utils/openPdf";
import { downloadFile } from "../utils/downloadFile";

export default function HealthRecordScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { healthRecord, loading, refreshing, loadHealthRecord, refresh } =
    useHealthRecords();
  const [timelinePage, setTimelinePage] = useState(1);

  const [labPage, setLabPage] = useState(1);

  const [documentPage, setDocumentPage] = useState(1);

  const [activeTab, setActiveTab] = useState<HealthRecordTab>("TIMELINE");
  useEffect(() => {
    setTimelinePage(1);
    setLabPage(1);
    setDocumentPage(1);
  }, [activeTab]);

  useEffect(() => {
    loadHealthRecord(timelinePage, labPage, documentPage);
  }, [timelinePage, labPage, documentPage, loadHealthRecord]);
  const prescriptions = useMemo(() => {
    return (
      healthRecord?.consultations
        .filter((consultation) => consultation.prescriptions?.length)
        .map((consultation) => ({
          consultationId: consultation._id,

          doctor: consultation.doctorEmployeeId?.name,

          department: consultation.doctorEmployeeId?.department,

          specialization: consultation.doctorEmployeeId?.specialization,

          date: consultation.createdAt,

          diagnosis: consultation.diagnosis,

          symptoms: consultation.symptoms,

          doctorNotes: consultation.doctorNotes,

          vitals: consultation.vitals,

          prescriptions: consultation.prescriptions,
        })) ?? []
    );
  }, [healthRecord]);
  const consultations = useMemo(
    () => healthRecord?.consultations ?? [],
    [healthRecord],
  );

  const reports = useMemo(() => healthRecord?.labReports ?? [], [healthRecord]);

  const documents = useMemo(
    () => healthRecord?.medicalDocuments ?? [],
    [healthRecord],
  );

  const handleViewPrescription = useCallback(
    (prescription: PrescriptionGroup) => {
      navigation.navigate("PrescriptionDetails", {
        prescription,
      });
    },
    [navigation],
  );

  const handleDownloadPrescription = useCallback(
    async (prescription: PrescriptionGroup) => {
      await downloadPrescriptionPdf(prescription);
    },
    [],
  );
  const handleViewReport = useCallback(async (report: LabReport) => {
    const url = getFileUrl(report.documentUrl);

    if (!url) {
      return;
    }

    await openPdf(url, `${report.title}.pdf`);
  }, []);
  const handleDownloadReport = useCallback(async (report: LabReport) => {
    const url = getFileUrl(report.documentUrl);

    if (!url) {
      return;
    }

    await downloadFile(url, `${report.title}.pdf`);
  }, []);
  const handleViewDocument = useCallback(async (document: MedicalDocument) => {
    const url = getFileUrl(document.documentUrl);

    if (!url) {
      return;
    }

    await openPdf(url, `${document.title}.pdf`);
  }, []);
  const handleDownloadDocument = useCallback(
    async (document: MedicalDocument) => {
      const url = getFileUrl(document.documentUrl);

      if (!url) {
        return;
      }

      await downloadFile(url, `${document.title}.pdf`);
    },
    [],
  );
  if (loading && !healthRecord) {
    return (
      <View style={styles.container}>
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </View>
    );
  }

  if (!healthRecord) {
    return (
      <View style={styles.loaderContainer}>
        <Text>No health records found</Text>
      </View>
    );
  }
  const onRefresh = useCallback(() => {
    refresh(timelinePage, labPage, documentPage);
  }, [timelinePage, labPage, documentPage, refresh]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="#2563EB"
        />
      }
    >
      <View style={styles.header}>
        <Text style={styles.heading}>Health Records</Text>

        <Text style={styles.subtitle}>
          View consultations, prescriptions, reports and documents.
        </Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statsRow}>
          <StatCard
            title="Visits"
            value={healthRecord.meta.consultations.totalRecords}
          />

          <StatCard
            title="Reports"
            value={healthRecord.meta.labReports.totalRecords}
          />

          <StatCard
            title="Documents"
            value={healthRecord.meta.medicalDocuments.totalRecords}
          />
        </View>
      </View>

      <View style={styles.cardContainer}>
        <GlassCard>
          <HealthRecordTabs activeTab={activeTab} onChange={setActiveTab} />

          {activeTab === "TIMELINE" && (
            <>
              {healthRecord.consultations.length === 0 ? (
                <EmptyState title="No consultations found" />
              ) : (
                <>
                  {consultations.map((consultation) => (
                    <TimelineCard
                      key={consultation._id}
                      consultation={consultation}
                    />
                  ))}

                  <Pagination
                    page={timelinePage}
                    totalPages={healthRecord.meta.consultations.totalPages}
                    onPrevious={() =>
                      setTimelinePage((prev) => Math.max(1, prev - 1))
                    }
                    onNext={() =>
                      setTimelinePage((prev) =>
                        Math.min(
                          healthRecord.meta.consultations.totalPages,
                          prev + 1,
                        ),
                      )
                    }
                  />
                </>
              )}
            </>
          )}

          {activeTab === "PRESCRIPTIONS" && (
            <>
              {prescriptions.length === 0 ? (
                <EmptyState title="No prescriptions found" />
              ) : (
                prescriptions.map((item) => (
                  <PrescriptionCard
                    key={item.consultationId}
                    item={item}
                    onView={handleViewPrescription}
                    onDownload={handleDownloadPrescription}
                  />
                ))
              )}
              <Pagination
                page={labPage}
                totalPages={healthRecord.meta.labReports.totalPages}
                onPrevious={() => setLabPage((prev) => Math.max(1, prev - 1))}
                onNext={() =>
                  setLabPage((prev) =>
                    Math.min(healthRecord.meta.labReports.totalPages, prev + 1),
                  )
                }
              />
            </>
          )}

          {activeTab === "REPORTS" && (
            <>
              {healthRecord.labReports.length === 0 ? (
                <EmptyState title="No reports found" />
              ) : (
                reports.map((report) => (
                  <LabReportCard
                    key={report._id}
                    report={report}
                    onView={handleViewReport}
                    onDownload={handleDownloadReport}
                  />
                ))
              )}
              <Pagination
                page={documentPage}
                totalPages={healthRecord.meta.medicalDocuments.totalPages}
                onPrevious={() =>
                  setDocumentPage((prev) => Math.max(1, prev - 1))
                }
                onNext={() =>
                  setDocumentPage((prev) =>
                    Math.min(
                      healthRecord.meta.medicalDocuments.totalPages,
                      prev + 1,
                    ),
                  )
                }
              />
            </>
          )}
          {activeTab === "DOCUMENTS" && (
            <>
              {healthRecord.medicalDocuments.length === 0 ? (
                <EmptyState title="No documents found" />
              ) : (
                documents.map((document) => (
                  <MedicalDocumentCard
                    key={document._id}
                    document={document}
                    onView={handleViewDocument}
                    onDownload={handleDownloadDocument}
                  />
                ))
              )}
              <Pagination
                page={documentPage}
                totalPages={healthRecord.meta.medicalDocuments.totalPages}
                onPrevious={() =>
                  setDocumentPage((prev) => Math.max(1, prev - 1))
                }
                onNext={() =>
                  setDocumentPage((prev) =>
                    Math.min(
                      healthRecord.meta.medicalDocuments.totalPages,
                      prev + 1,
                    ),
                  )
                }
              />
            </>
          )}
        </GlassCard>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7FC",
  },

  contentContainer: {
    paddingBottom: 120,
  },

  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F4F7FC",
    padding: 20,
  },

  header: {
    paddingHorizontal: 20,
    paddingTop: 70,
  },

  heading: {
    fontSize: 30,
    fontWeight: "800",
    color: "#0F172A",
  },

  subtitle: {
    color: "#64748B",
    marginTop: 8,
    fontSize: 15,
    lineHeight: 22,
  },

  statsContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  cardContainer: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
  },

  emptyText: {
    textAlign: "center",
    color: "#64748B",
    marginTop: 40,
    marginBottom: 20,
    fontSize: 16,
  },
});
