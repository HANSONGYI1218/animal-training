import AdoptionForm from "@/components/mypage/corporation/adoption-bar/management/adoption-form";
import { GetAdoptionDto } from "@/dtos/adoption.dto";
import { GetAnimalDto } from "@/dtos/animal.dto";

export default async function AdoptionFormNewPage({
  searchParams,
}: {
  searchParams: {
    animalId: string;
  };
}) {
  const { animalId } = searchParams;

  const responseAnimal = await fetch(
    `${process.env.NEXT_PUBLIC_WEB_URL}/api/animal?id=${animalId}`,
    {
      method: "GET",
      cache: "no-store",
    },
  );
  if (!responseAnimal.ok) {
    return null;
  }
  const animal: GetAnimalDto = await responseAnimal.json();

  return <AdoptionForm animal={animal} />;
}
