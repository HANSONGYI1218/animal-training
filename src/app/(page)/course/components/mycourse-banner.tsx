import LottieBox from "@/components/common/lottie-box";
import ProgressBar from "./progress-bar";

export default function MyCourseBanner({ progress }: { progress: number[] }) {
  const dogLottie = require("/public/lottie/dog-lottie.json");

  return (
    <div className="w-full bg-[#e3f1e3] h-[400px]">
      <div className="flex container py-12 items-center">
        <div className="flex flex-1 flex-col gap-6">
          <h1 className="text-HB24">나의 진도율</h1>
          <ProgressBar progress={progress} />
        </div>
        <LottieBox lottieData={dogLottie} className="flex w-64 h-64" />
      </div>
    </div>
  );
}
