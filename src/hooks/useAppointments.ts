import {
  useCallback,
  useState,useMemo
} from "react";

import {
  AppointmentResponse,
} from "../types/Appointment";

import {
  getAppointments,
} from "../services/appointment.service";

export default function useAppointments() {
  const [
    appointments,
    setAppointments,
  ] =
    useState<AppointmentResponse | null>(
      null,
    );

  const [
    loading,
    setLoading,
  ] =
    useState(false);

  const [
    refreshing,
    setRefreshing,
  ] =
    useState(false);

  const loadAppointments =
    useCallback(
      async (
        page = 1,
        search = "",
        status = "ALL",
        isRefresh = false,
      ) => {
        try {
          if (
            isRefresh
          ) {
            setRefreshing(
              true,
            );
          } else {
            setLoading(
              true,
            );
          }

         const response =
  await getAppointments(
    page,
    search,
    status,
  );
          setAppointments(
            {
              data:
                response.data
                  .data ??
                [],

              meta:
                response.data
                  .meta ?? {
                  page: 1,
                  limit: 5,
                  totalRecords: 0,
                  totalPages: 1,
                },
            },
          );
        } catch (
          error: any
        ) {
          console.log(
            "Appointment Error",
            error
              ?.response
              ?.data ??
              error,
          );
        } finally {
          setLoading(
            false,
          );

          setRefreshing(
            false,
          );
        }
      },
      [],
    );

  const refresh =
    useCallback(
      (
        page = 1,
        search = "",
        status = "ALL",
      ) => {
        loadAppointments(
          page,
          search,
          status,
          true,
        );
      },
      [
        loadAppointments,
      ],
    );

 return useMemo(
  () => ({
    appointments,
    loading,
    refreshing,
    loadAppointments,
    refresh,
  }),
  [
    appointments,
    loading,
    refreshing,
    loadAppointments,
    refresh,
  ],
);
}