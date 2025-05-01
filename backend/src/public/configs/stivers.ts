import { Config } from "../interfaces";

export const stiversConfig: Config = {
  email_recipients: [
    "lbudbill@gpcorp.com",
    "lbudbell@comcast.net",
    "doubleujabbour@gmail.com",
  ],
  // TODO: can use same secret name across accounts and remove this config value
  secretName: "stivers-website",
};
