import { getWebConfigValue } from "guardian-common";

function formatRep(rep) {
  const territory = rep.territory ? ` (${rep.territory})` : "";
  const contact = rep.email ?? rep.phone ?? "";
  const separator = contact ? " — " : "";
  return `${rep.name}${territory}${separator}${contact}`;
}

export default function Footer() {
  const accountReps = getWebConfigValue("account_reps");
  return (
    <footer className="border-t border-gray-200 bg-gray-50 mt-auto py-6 px-4">
      <div className="flex flex-col items-center gap-1 text-gray-600 text-sm">
        <p className="font-semibold text-gray-800">Guardian Products — 5575 Spalding Drive, Peachtree Corners, GA 30092</p>
        <p className="font-semibold text-gray-800">Phone: 800-727-7222</p>
        {accountReps.length > 0 && (
          <div className="flex flex-col items-center gap-0.5 mt-1">
            <p className="text-xs uppercase tracking-wide text-gray-400 mb-1">Account Reps</p>
            {accountReps.map((rep, i) => (
              <p key={i}>{formatRep(rep)}</p>
            ))}
          </div>
        )}
      </div>
    </footer>
  );
}
