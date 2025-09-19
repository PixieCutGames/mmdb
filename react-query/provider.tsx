"use client";

import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { queryClient, persister } from "./client";
import { PropsWithChildren } from "react";

export const QueryProvider = ({ children }: PropsWithChildren) => {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      {children}
    </PersistQueryClientProvider>
  );
};
