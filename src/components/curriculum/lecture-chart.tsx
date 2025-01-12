"use client";

import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";
import React from "react";
import { CurriculumLectureDto } from "@/dtos/curriculum.lecture.dto";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import Image from "next/image";
import { Button } from "../ui/button";
import { CurriculumStep } from "@prisma/client";

export default function LectureChart({
  lectures,
  lastVideoIndex,
  curriculumStatus,
}: {
  lectures: CurriculumLectureDto[];
  lastVideoIndex: number;
  curriculumStatus: CurriculumStep;
}) {
  const chartData = [
    {
      browser: "safari",
      lecture: lectures?.length,
      fill: "var(--color-safari)",
    },
  ];

  const chartConfig = {
    lecture: {
      label: "강의수",
    },
    safari: {
      label: "Safari",
      color: "#00592D",
    },
  } satisfies ChartConfig;

  return (
    <div className="flex flex-col gap-3 rounded-xl bg-[#F9F9F9] p-6">
      <div className="flex flex-col gap-1">
        <span className="font-semibold">학습현황</span>
        <span className="text-neutral-500">
          지금까지 학습한 내용과 진도율을 체크해 보세요.
        </span>
      </div>
      <hr className="w-full" />
      <div className="flex gap-1">
        <div className="flex w-full flex-col items-center">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square w-full"
          >
            <RadialBarChart
              data={chartData}
              startAngle={0}
              endAngle={(lastVideoIndex / lectures?.length) * 360}
              innerRadius={80}
              outerRadius={110}
            >
              <PolarGrid
                gridType="circle"
                radialLines={false}
                stroke="none"
                className="first:fill-muted last:fill-background"
                polarRadius={[86, 74]}
              />
              <RadialBar dataKey="lecture" background cornerRadius={10} />
              <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={(viewBox.cx || 0) - 20}
                            y={viewBox.cy}
                            className="fill-foreground text-4xl font-bold"
                          >
                            {lastVideoIndex}
                          </tspan>
                          <tspan
                            x={(viewBox.cx || 0) + 8}
                            y={viewBox.cy}
                            className="fill-foreground text-xl font-bold"
                          >
                            /
                          </tspan>
                          <tspan
                            x={(viewBox.cx || 0) + 28}
                            y={viewBox.cy}
                            className="fill-foreground text-xl font-bold"
                          >
                            {chartData[0].lecture.toLocaleString()}
                          </tspan>

                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            완료
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </PolarRadiusAxis>
            </RadialBarChart>
          </ChartContainer>
          <span className="font-semibold text-neutral-500">완료강의</span>
        </div>
        <div className="flex min-h-[233px] w-full flex-col items-center justify-end gap-5">
          <div className="relative flex h-[140px] w-2/3 justify-between rounded-xl bg-white p-7">
            <Image
              src="/images/curriculum/test.png"
              width={64}
              height={64}
              alt="test"
              className="h-[64px] self-center"
            />
            <div className="flex flex-col justify-between">
              <span className="text-xl font-bold text-red-500">
                <span>70</span>점 이상
              </span>
              <Button
                disabled={curriculumStatus !== "LECTURE_END"}
                variant={"destructive"}
                className="rounded-full"
              >
                시험 보러가기
              </Button>
            </div>
          </div>
          <span className="font-semibold text-neutral-500">자격시험</span>
        </div>
      </div>
    </div>
  );
}
