import RecordBanner from "@/components/record/record-banner";
import RecordContainer from "@/components/record/record-container";

export default function RecordPage({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <main className="mb-24 flex w-full flex-col gap-12">
      <RecordBanner />
      <div className="container mx-auto flex max-w-[1150px] flex-col items-center">
        <RecordContainer />
      </div>
    </main>
  );
}
