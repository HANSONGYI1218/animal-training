"use client";

import { useEffect, useState } from "react";
import SelectBox from "../../common/select-box";
import SearchBox from "../../common/search-box";
import TrainingCenterCard from "./center-card";
import { GetTrainingCenterDetailDto } from "@/dtos/training.center.dto";
import { AnimalType, Review } from "@prisma/client";
import { Loader2 } from "lucide-react";

export type TrainingCenterWithTutor = Omit<
  GetTrainingCenterDetailDto,
  "tutorTrainingCenters"
> & {
  tutor: {
    id: string;
    name: string;
    career?: string;
    profile_img?: string;
    introduction?: string;
  };
  price: string;
  holidays: string[];
  like: number;
  reviews: Review[];
  animal_types: AnimalType[];
};

export default function TrainingFiltering() {
  const [allCenters, setAllCenters] = useState<TrainingCenterWithTutor[]>([]);
  const [centers, setCenters] = useState<TrainingCenterWithTutor[]>([]);
  const [sort, setSort] = useState("별점좋은순");
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    if (allCenters.length > 0) {
      const filteredCenters = allCenters.filter(
        (center: TrainingCenterWithTutor) => {
          const matchesLocation =
            location.length === 0 || center.address.includes(location);

          const matchesSearch =
            search.length === 0 ||
            center.name.includes(search) ||
            center?.tutor.name.includes(search);

          return matchesSearch && matchesLocation;
        },
      );

      const sortedCenters = filteredCenters.sort((a, b) => {
        if (sort === "별점좋은순") {
          return b.like - a.like;
        }
        if (sort === "후기많은순") {
          return b.reviews.length - a.reviews.length;
        }
        if (sort === "최신순") {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        }
        if (sort === "가격낮은순") {
          return parseInt(a.price) - parseInt(b.price);
        }
        if (sort === "가격높은순") {
          return parseInt(b.price) - parseInt(a.price);
        }
        //   if (sort === "가까운순") {
        //     return b.like - a.like;
        //   }
        return 0;
      });

      setCenters(sortedCenters);
    }
  }, [allCenters, sort, search, location]);

  useEffect(() => {
    const getData = async () => {
      const responseTrainingCenters = await fetch(
        `${process.env.NEXT_PUBLIC_WEB_URL}/api/training-center`,
        {
          method: "GET",
          cache: "no-store",
        },
      );
      if (!responseTrainingCenters.ok) {
        return null;
      }
      const trainingCenters: GetTrainingCenterDetailDto[] =
        await responseTrainingCenters.json();

      const filteringCenters = trainingCenters.flatMap((center) => {
        const { tutorTrainingCenters, ...restCenter } = center;

        return tutorTrainingCenters.map((tutorTrainingCenter) => ({
          ...restCenter, // 센터의 나머지 정보
          tutor: tutorTrainingCenter.tutor,
          price: tutorTrainingCenter.price,
          holidays: tutorTrainingCenter.holidays,
          like: tutorTrainingCenter.like,
          reviews: tutorTrainingCenter.reviews,
          animal_types: tutorTrainingCenter.animal_types,
        }));
      });

      filteringCenters.sort((a, b) => {
        return b.like - a.like;
      });

      setAllCenters(filteringCenters);
    };

    getData();
  }, []);

  return (
    <div className="flex w-full flex-col gap-12">
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <SelectBox
            lists={[
              "별점좋은순",
              "후기많은순",
              "최신순",
              "가까운순",
              "가격낮은순",
              "가격높은순",
            ]}
            useStateF={setSort}
            placeholder="별점좋은순"
            className="w-36"
          />
          <SearchBox
            useStateF={setLocation}
            placeholder="훈련소 위치를 검색해보세요(ex. 충청북도, 공주시)"
            className="w-96"
          />
        </div>
        <SearchBox
          useStateF={setSearch}
          placeholder="훈련소, 훈련사 이름을 찾아보세요"
          className="w-96"
        />
      </div>
      <div className="flex min-h-[300px] flex-col items-center justify-center">
        {centers.length > 0 ? (
          centers.map(
            (trainingCenter: TrainingCenterWithTutor, index: number) => {
              return (
                <TrainingCenterCard
                  key={index}
                  trainingCenter={trainingCenter}
                />
              );
            },
          )
        ) : (
          <Loader2 className="animate-spin" />
        )}
      </div>
    </div>
  );
}
