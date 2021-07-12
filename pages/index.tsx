import dynamic from "next/dynamic";

const KLineChart = dynamic(() => import("../components/KLineChart"), {
  ssr: false
});

export default function Home() {
  return (
    <>
      <h1>lightweight chart</h1>
      <KLineChart width={800} height={600}/>
    </>
  );
}
