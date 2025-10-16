export function useNextGenRouting() {
  return (
    window.location.href.includes("gpc81") ||
    window.location.href.includes("localhost")
  );
}
