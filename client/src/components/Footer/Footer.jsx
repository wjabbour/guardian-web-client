import { getConfigValue } from "../../lib/config";

export default function Footer() {
  const accountReps = getConfigValue("account_reps");
  const accountRepString = accountReps.map((rep) => {
    return `${rep.name} (${rep.phone})`
  }).join(' & ')
  return (
    <div className="flex justify-center text-[28px] font-bold">
      <div className="flex flex-col items-center">
        <h1>Guardian Main Line: 800-727-7222</h1>
        <h1>
          Account Reps: {accountRepString}
        </h1>
      </div>
    </div>
  );
}
