export default function ProgressColor({
  progress,
  className,
}: {
  progress: number;
  className?: string;
}) {
  let color: string;
  if (progress < 50) {
    color = "text-[#d00000]";
  } else if (progress < 90) {
    color = "text-[#fe7f2d]";
  } else {
    color = "text-[#008000]";
  }
  return <h1 className={`${className} ${color}`}>{progress}%</h1>;
}
