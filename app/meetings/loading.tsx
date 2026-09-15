export default function Loading() {
  return (
    <div
      className="flex min-h-64 items-center justify-center"
      role="status"
      aria-live="polite"
    >
      <p className="text-slate-500">
        Loading meetings...
      </p>
    </div>
  );
}