import { Config } from "../interfaces";

export const standardConfig: Config = {
  email_recipients: [
    "lbudbill@gpcorp.com",
    "lbudbell@comcast.net",
    "doubleujabbour@gmail.com",
  ],
  // TODO: can use same secret name across accounts and remove this config value
  secretName: "stivers-website",
};
