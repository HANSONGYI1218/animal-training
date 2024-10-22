"use client";

import { useEffect, useState } from "react";
import SelectBox from "../common/select-box";
import SearchBox from "../common/search-box";
import TrainingCenterCard from "./training-center-card";
import { TrainingCenter } from "@prisma/client";

export default function TrainingFiltering({
  trainingCenters,
}: {
  trainingCenters: TrainingCenter[];
}) {
  const [centers, setCenters] = useState(trainingCenters);
  const [sort, setSort] = useState("별점좋은순");
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    const filteredCenters = trainingCenters.filter((center: TrainingCenter) => {
      const matchesLocation =
        location.length === 0 || center.address.includes(location);

      const matchesSearch = search.length === 0 || center.name.includes(search); //튜터 이름 포함 시켜야 됨

      return matchesSearch && matchesLocation;
    });

    const sortedCenters = filteredCenters.sort((a, b) => {
      //   if (sort === "별점좋은순") {
      //     return b.createdAt.getTime() - a.createdAt.getTime();
      //   }
      //   if (sort === "후기많은순") {
      //     return a.createdAt.getTime() - b.createdAt.getTime();
      //   }
      if (sort === "최신순") {
        return b.createdAt.getTime() - a.createdAt.getTime();
      }
      if (sort === "가격낮은순") {
        return a.price - b.price;
      }
      if (sort === "가격높은순") {
        return b.price - a.price;
      }
      //   if (sort === "가까운순") {
      //     return b.like - a.like;
      //   }
      return 0;
    });

    setCenters(sortedCenters);
  }, [sort, search, location, trainingCenters]);

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
      <div className="flex flex-col">
        {centers.map((trainingCenter) => {
          return (
            <TrainingCenterCard
              key={trainingCenter.id}
              trainingCenter={trainingCenter}
            />
          );
        })}
      </div>
    </div>
  );
}
