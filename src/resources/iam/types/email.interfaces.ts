export type EmailConfig = {
  service: "gmail" | "yahoo" | "outlook" | "zoho" | "aol";
  sendermail: string;
  password: string;
};

export type ServiceType = "gmail" | "yahoo" | "outlook" | "zoho" | "aol";
