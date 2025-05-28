import PageTitle from "@/components/page-title";

export default function Home() {
  return (
    <div
      className="w-full border rounded-sm p-2"
      data-testid="home-page"
    >
      <PageTitle name="Home Page" />
    </div>
  );
}
