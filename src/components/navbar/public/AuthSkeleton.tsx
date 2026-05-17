export default function AuthSkeleton() {
  return (
    <div className="flex items-center gap-2">
      <div className="h-8 w-16 animate-pulse rounded-sm bg-border/50" />
      <div className="h-8 w-28 animate-pulse rounded-full bg-border/50" />
    </div>
  );
}