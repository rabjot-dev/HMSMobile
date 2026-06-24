import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import GlassCard from "../components/cards/GlassCard";
import {
  getMyLabReports,
  getMyHealthRecords,
  getMyPrescriptions,
} from "../services/medical-record.service";

export default function MedicalRecordsScreen() {
  const navigation = useNavigation<any>();

  const [activeTab, setActiveTab] = useState<
    "PRESCRIPTIONS" | "HEALTH_RECORDS" | "LAB_REPORTS"
  >("PRESCRIPTIONS");
  const [prescriptions, setPrescriptions] = useState<any[]>([]);
  const [healthRecords, setHealthRecords] = useState<any[]>([]);
  const [labReports, setLabReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const loadRecords = async () => {
    try {
      setLoading(true);

      const [
        prescriptionResponse,
        healthRecordResponse,
        labReportResponse,
      ] = await Promise.all([
        getMyPrescriptions(),
        getMyHealthRecords(),
        getMyLabReports(),
      ]);

      setPrescriptions(prescriptionResponse.data.data || []);
      setHealthRecords(healthRecordResponse.data.data || []);
      setLabReports(labReportResponse.data.data || []);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadRecords();
    setRefreshing(false);
  };

  useFocusEffect(
    useCallback(() => {
      loadRecords();
    }, []),
  );

  const renderPrescription = ({ item }: { item: any }) => (
    <TouchableOpacity
      activeOpacity={0.86}
      onPress={() => navigation.navigate("PrescriptionDetail", { id: item._id })}
    >
      <GlassCard>
        <Text style={styles.cardTitle}>
          Dr. {item?.doctorEmployeeId?.name || "Not available"}
        </Text>

        <Text style={styles.departmentText}>
          {item?.doctorEmployeeId?.department || "Department not available"}
        </Text>

        <Text style={styles.cardDate}>
          {item?.createdAt?.split("T")[0] || "Date not available"}
        </Text>

        <Text style={styles.openHint}>View full prescription</Text>
      </GlassCard>
    </TouchableOpacity>
  );

  const renderDocumentRecord = ({ item }: { item: any }) => (
    <TouchableOpacity
      activeOpacity={0.86}
      onPress={() =>
        navigation.navigate("HealthRecordDetail", { id: item._id })
      }
    >
      <GlassCard>
        <Text style={styles.cardTitle}>{item?.title || "Untitled record"}</Text>

        <Text style={styles.departmentText}>
          {formatDocumentType(item?.documentType)}
        </Text>

        <Text style={styles.cardDate}>
          {(item?.documentDate || item?.createdAt)?.split("T")[0] ||
            "Date not available"}
        </Text>

        <Text style={styles.openHint}>View document details</Text>
      </GlassCard>
    </TouchableOpacity>
  );

  const emptyText =
    activeTab === "PRESCRIPTIONS"
      ? "No prescriptions found"
      : activeTab === "HEALTH_RECORDS"
        ? "No health records found"
      : "No lab reports found";

  const activeRecords =
    activeTab === "HEALTH_RECORDS" ? healthRecords : labReports;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Medical Records</Text>

        <Text style={styles.subtitle}>
          View your prescriptions and health documents.
        </Text>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "PRESCRIPTIONS" && styles.activeTab,
          ]}
          onPress={() => setActiveTab("PRESCRIPTIONS")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "PRESCRIPTIONS" && styles.activeTabText,
            ]}
          >
          Prescriptions
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.tabButton,
          activeTab === "HEALTH_RECORDS" && styles.activeTab,
        ]}
        onPress={() => setActiveTab("HEALTH_RECORDS")}
      >
        <Text
          style={[
            styles.tabText,
            activeTab === "HEALTH_RECORDS" && styles.activeTabText,
          ]}
        >
          Health Records
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "LAB_REPORTS" && styles.activeTab,
          ]}
          onPress={() => setActiveTab("LAB_REPORTS")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "LAB_REPORTS" && styles.activeTabText,
            ]}
          >
            Lab Reports
          </Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color="#2563EB" size="large" />

          <Text style={styles.loadingText}>Loading medical records...</Text>
        </View>
      ) : activeTab === "PRESCRIPTIONS" ? (
        <FlatList
          data={prescriptions}
          keyExtractor={(item) => item._id}
          renderItem={renderPrescription}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>{emptyText}</Text>

              <Text style={styles.emptySubtitle}>
                Completed consultation prescriptions will appear here.
              </Text>
            </View>
          }
        />
      ) : (
        <FlatList
          data={activeRecords}
          keyExtractor={(item) => item._id}
          renderItem={renderDocumentRecord}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>{emptyText}</Text>

              <Text style={styles.emptySubtitle}>
                {activeTab === "HEALTH_RECORDS"
                  ? "Uploaded health records will appear here."
                  : "Uploaded lab reports will appear here."}
              </Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}

function formatDocumentType(value?: string) {
  if (!value) {
    return "Document";
  }

  return value
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7FC",
  },

  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#0F172A",
  },

  subtitle: {
    color: "#64748B",
    marginTop: 8,
    lineHeight: 22,
  },

  tabs: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 20,
    padding: 6,
    borderRadius: 18,
    backgroundColor: "#EAF1FF",
  },

  tabButton: {
    flex: 1,
    height: 46,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },

  activeTab: {
    backgroundColor: "#2563EB",
  },

  tabText: {
    color: "#475569",
    fontWeight: "700",
    fontSize: 12,
    textAlign: "center",
  },

  activeTabText: {
    color: "#FFFFFF",
  },

  listContent: {
    padding: 20,
    paddingBottom: 120,
  },

  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },

  loadingText: {
    color: "#64748B",
    fontWeight: "700",
  },

  cardTitle: {
    color: "#0F172A",
    fontSize: 18,
    fontWeight: "800",
  },

  cardDate: {
    color: "#64748B",
    marginTop: 8,
  },

  departmentText: {
    color: "#2563EB",
    fontWeight: "700",
    marginTop: 6,
  },

  openHint: {
    color: "#2563EB",
    fontWeight: "800",
    marginTop: 18,
  },

  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
    marginTop: 80,
  },

  emptyTitle: {
    color: "#0F172A",
    fontSize: 20,
    fontWeight: "800",
  },

  emptySubtitle: {
    color: "#64748B",
    marginTop: 8,
    textAlign: "center",
    lineHeight: 22,
  },
});
