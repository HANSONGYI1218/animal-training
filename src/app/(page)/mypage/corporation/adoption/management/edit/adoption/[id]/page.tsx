import AnimalForm from "@/components/mypage/corporation/adoption-bar/management/animal-form";
import { GetAnimalDto } from "@/dtos/animal.dto";

export default async function AnimalFormEditPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const responseAnimal = await fetch(
    `${process.env.NEXT_PUBLIC_WEB_URL}/api/animal?id=${id}`,
    {
      method: "GET",
      cache: "no-store",
    },
  );
  if (!responseAnimal.ok) {
    return null;
  }
  const animal: GetAnimalDto = await responseAnimal.json();

  return <AnimalForm animal={animal} />;
}
