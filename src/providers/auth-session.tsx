"use client";

import { currentAccount } from "@/action/user-action";
import { SessionProvider } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";

const SessionContext = createContext(null);

export default function AuthSession({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await currentAccount();
      setSession(sessionData);
    };

    fetchSession();
  }, []);
  return <SessionProvider session={session}>{children}</SessionProvider>;
}

export const useSession = () => {
  return useContext(SessionContext);
};
