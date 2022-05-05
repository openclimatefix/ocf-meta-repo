import Head from "next/head";
import Link from "next/link";

export default function Home() {
  const DATES_OF_INTEREST = [
    "2020-08-07",
    "2021-03-05",
    "2021-03-09",
    "2021-06-10",
    "2021-10-08",
  ]; // YYYY-MM-DD

  return (
    <>
      <Head>
        <title>UX Demos</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-5xl py-20 mx-auto bg-gray-100">
        {DATES_OF_INTEREST.map((date) => (
          <div key={date}>
            <h2 className="mt-20 mb-4 text-4xl font-bold">
              {date === "2021-10-08"
                ? `${date} (Fake DATA)`
                : `${date} (Real)`}
            </h2>
            <ul className="pl-6 text-lg list-disc list-inside">
              <li>
                <Link href={`/vis1-map?date=${date}`}>
                  <a>Vis1 Map: Solar Generation Data by Site</a>
                </Link>
              </li>
              <li>
                <Link href={`/vis1-line-only?date=${date}`}>
                  <a>Vis1 Line Only: National Forecast vs Actual</a>
                </Link>
              </li>
              <li>
                <Link href={`/vis2-map-circ?date=${date}`}>
                  <a>
                    Vis2 Map Circ: Various Forecast Metrics by GSP (CIRCLES)
                  </a>
                </Link>
              </li>
              <li>
                <Link href={`/vis2-map-poly?date=${date}`}>
                  <a>
                    Vis2 Map Poly: Various Forecast Metrics by GSP (POLYGONS)
                  </a>
                </Link>
              </li>
              <li>
                <Link href={`/vis3-bar?date=${date}`}>
                  <a>Vis3 Bar: Generation Mix with Demand</a>
                </Link>
              </li>
            </ul>
          </div>
        ))}
      </main>
    </>
  );
}
