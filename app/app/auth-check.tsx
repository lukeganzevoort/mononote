"use client";

import PocketBase from "pocketbase";
import { useState, useEffect } from "react";

const pb = new PocketBase(process.env.POCKETBASE_URL);

export const AuthCheck = () => {
  useEffect(() => {
    // Check if the authentication token is valid
    const isValid = pb.authStore.isValid;

    // If not authenticated, redirect to login page
    if (!isValid) {
      pb.authStore.clear();
      window.location.href = "/auth/login";
    }
  }, []);

  return null;
};
