export default function TotalProgress(progresses: number[]) {
  const totalProgress = Math.floor(progresses.reduce((a, b) => a + b) / 5);

  if (totalProgress === 0) {
    return [0, "가족이 되고 싶어요"];
  } else if (totalProgress <= 30) {
    return [20, "열심히 공부하고 있네요!"];
  } else if (totalProgress <= 60) {
    return [60, "거의 다 왔어요! 파이팅"];
  } else if (totalProgress <= 90) {
    return [90, "나를 잘 알고있네요!"];
  } else {
    return [100, "가족이 될 수 있어요"];
  }
}
