import CenterDetailBanner from "@/components/curriculum/traning/center-banner";
import CenterContainer from "@/components/curriculum/traning/center-container";
import dummydata from "@/utils/dummydata";

export default function TraningDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const center = dummydata.traningCenterData.find((item) => item.id === id);
  const tutor = dummydata.TutorData.find((item) => item.id === center?.tutorId);
  const reviews = dummydata.reviewData.filter(
    (item) => item.traningCenterId === id,
  );

  return (
    <main className="mb-24 flex w-full flex-col">
      <CenterDetailBanner center={center} tutor={tutor} />
      <section className="container mx-auto mt-12 flex max-w-[1150px] flex-col gap-6">
        <CenterContainer center={center} tutor={tutor} reviews={reviews} />
      </section>
    </main>
  );
}
