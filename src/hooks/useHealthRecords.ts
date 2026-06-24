import {
  useCallback,
  useState,
} from "react";

import {
  HealthRecordDetails,
} from "../types/HealthRecord";

import {
  getMyHealthRecord,
} from "../services/healthRecord.service";

export default function useHealthRecords() {
  const [
    healthRecord,
    setHealthRecord,
  ] =
    useState<HealthRecordDetails | null>(
      null,
    );

  const [
    loading,
    setLoading,
  ] =
    useState(false);

  const loadHealthRecord =
    useCallback(
      async () => {
        try {
          setLoading(
            true,
          );

          const response =
            await getMyHealthRecord();

          setHealthRecord(
            response.data.data,
          );
        } catch (
          error: any
        ) {
          console.log(
            "Health Record Error",
            error?.response
              ?.data ??
              error,
          );
        } finally {
          setLoading(
            false,
          );
        }
      },
      [],
    );

  return {
    healthRecord,
    loading,
    loadHealthRecord,
  };
}