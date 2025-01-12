import AdoptionForm from "@/components/mypage/corporation/adoption-bar/management/adoption-form";
import { GetAdoptionDto } from "@/dtos/adoption.dto";

export default async function AdoptionFormEditPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const responseAdoption = await fetch(
    `${process.env.NEXT_PUBLIC_WEB_URL}/api/adoption?adoptionId=${id}`,
    {
      method: "GET",
      cache: "no-store",
    },
  );
  if (!responseAdoption.ok) {
    return null;
  }
  const adoption: GetAdoptionDto = await responseAdoption.json();

  return (
    <AdoptionForm
      id={adoption?.id}
      adopter={adoption?.adopter}
      animal={adoption?.animal}
      userCurriculum={adoption?.userCurriculum}
    />
  );
}
