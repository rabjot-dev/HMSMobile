import { useCallback, useState, useMemo } from "react";

import { HealthRecordDetails } from "../types/HealthRecord";

import { getMyHealthRecord } from "../services/healthRecord.service";

export default function useHealthRecords() {
  const [healthRecord, setHealthRecord] = useState<HealthRecordDetails | null>(
    null,
  );

  const [loading, setLoading] = useState(false);

  const [refreshing, setRefreshing] = useState(false);

  const loadHealthRecord = useCallback(
    async (
      timelinePage = 1,
      labPage = 1,
      documentPage = 1,
      isRefresh = false,
    ) => {
      try {
        if (isRefresh) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        const response = await getMyHealthRecord(
          timelinePage,
          labPage,
          documentPage,
        );

        setHealthRecord(response.data.data);
      } catch (error: any) {
        console.log("Health Record Error", error?.response?.data ?? error);
      } finally {
        setLoading(false);

        setRefreshing(false);
      }
    },
    [],
  );

  const refresh = useCallback(
    (timelinePage = 1, labPage = 1, documentPage = 1) => {
      loadHealthRecord(timelinePage, labPage, documentPage, true);
    },
    [loadHealthRecord],
  );

  return useMemo(
    () => ({
      healthRecord,
      loading,
      refreshing,
      loadHealthRecord,
      refresh,
    }),
    [healthRecord, loading, refreshing, loadHealthRecord, refresh],
  );
}
