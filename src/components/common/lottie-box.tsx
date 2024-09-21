'use client';
import Lottie from 'lottie-react';

type LottieBox = {
  lottieData: any;
  className?: string;
};

export default function LottieBox({ lottieData, className }: LottieBox) {
  return <Lottie animationData={lottieData} className={className} />;
}
