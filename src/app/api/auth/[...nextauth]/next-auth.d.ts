// next-auth.d.ts

import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    owner_name: string;
  }

  interface Session extends DefaultSession {
    user?: User;
  }
}
