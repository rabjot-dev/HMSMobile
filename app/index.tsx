import { useEffect, useState } from "react";

import { Redirect } from "expo-router";

import { getToken }
from "../src/storage/token.storage";


export default function Index() {

  const [loading,
  setLoading] =
    useState(true);

  const [authenticated,
  setAuthenticated] =
    useState(false);

  useEffect(() => {

    checkToken();

  }, []);

  const checkToken =
  async () => {

    const token =
      await getToken();

    if (token) {

      setAuthenticated(
        true
      );
    }

    setLoading(
      false
    );
  };

  if (loading) {

    return null;
  }

  return authenticated
    ? (
      <Redirect
        href="/(patient)/dashboard"
      />
    )
    : (
      <Redirect
        href="/login"
      />
    );
}