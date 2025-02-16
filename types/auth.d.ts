import { type DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    email: string;
    image: string;
    whatsapp: string;
    role: "superadmin" | "admin" | "customer";
  }

  interface JWT extends User {}

  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image: string;
      whatsapp: string;
      role: "superadmin" | "admin" | "customer";
    } & DefaultSession["user"];
  }
}
