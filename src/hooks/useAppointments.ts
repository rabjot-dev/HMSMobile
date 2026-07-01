import { useCallback, useState, useMemo } from "react";
import { Appointment, AppointmentResponse } from "../types/Appointment";
import { getAppointments } from "../services/appointment.service";
import { logger } from "../utils/logger";

export default function useAppointments() {
  const [appointments, setAppointments] = useState<AppointmentResponse | null>(
    null,
  );

  const [loading, setLoading] = useState(false);

  const [refreshing, setRefreshing] = useState(false);

  const [loadingMore, setLoadingMore] = useState(false);

  const loadAppointments = useCallback(
    async (
      cursor = "",
      search = "",
      status = "ALL",
      isRefresh = false,
      append = false,
    ) => {
      try {
        if (isRefresh) {
          setRefreshing(true);
        } else if (append) {
          setLoadingMore(true);
        } else {
          setLoading(true);
        }

        const response = await getAppointments(cursor, search, status);
        const nextData = response.data.data ?? [];
        const nextMeta = response.data.meta ?? {
          limit: 5,
          nextCursor: null,
          hasNextPage: false,
        };

        setAppointments((current) => {
          if (!append || !current || isRefresh) {
            return {
              data: nextData,
              meta: nextMeta,
            };
          }

          const existingIds = new Set(current.data.map((item) => item._id));

          return {
            data: [
              ...current.data,
              ...nextData.filter(
                (item: Appointment) => !existingIds.has(item._id),
              ),
            ],
            meta: nextMeta,
          };
        });
      } catch (error) {
        logger.error("Appointment list load failed", error);
      } finally {
        setLoading(false);

        setRefreshing(false);

        setLoadingMore(false);
      }
    },
    [],
  );

  const refresh = useCallback(
    (search = "", status = "ALL") => {
      loadAppointments("", search, status, true);
    },
    [loadAppointments],
  );

  return useMemo(
    () => ({
      appointments,
      loading,
      refreshing,
      loadingMore,
      loadAppointments,
      refresh,
    }),
    [appointments, loading, refreshing, loadingMore, loadAppointments, refresh],
  );
}
