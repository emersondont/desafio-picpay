'use client'
import { queryClient } from "@/lib/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { StompSessionProvider } from "react-stomp-hooks";
import Notification from "@/components/notification";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <StompSessionProvider url={'http://localhost:8080/ws'}>
        <Notification />
        {children}
      </StompSessionProvider>
    </QueryClientProvider>
  )
}