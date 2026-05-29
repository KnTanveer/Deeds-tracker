import NamaazCard from "./components/NamaazCard";
import NavigateDates from "./components/navigateDates";
import PrayerHeatmap from "./components/PrayerHeatmap";
import Stats from "./pages/Stats";
import { formateDateKey } from "./utils/formatDate";
import { useEffect, useState } from "react";

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const dateKey = formateDateKey(selectedDate);

  const createEmptyDay = () => ({
    Fajr: { status: "none", points: 0 },
    Dhuhr: { status: "none", points: 0 },
    Asr: { status: "none", points: 0 },
    Maghrib: { status: "none", points: 0 },
    Isha: { status: "none", points: 0 },
  });

  // retrive data from local storage at start
  const [namaazData, setNamaazData] = useState(() => {
    const savedData = localStorage.getItem("namaazData");
    return savedData ? JSON.parse(savedData) : {};
  });

  // save to local storage on data change
  useEffect(() => {
    localStorage.setItem("namaazData", JSON.stringify(namaazData));
  }, [namaazData]);

  const updatePrayerStatus = (prayer, status) => {
    const pointsMap = { jamaat: 5, individual: 3, qaza: 2, none: 0 };

    setNamaazData((oldData) => ({
      ...oldData,
      [dateKey]: {
        ...(oldData[dateKey] || createEmptyDay()),
        [prayer]: {
          status,
          points: pointsMap[status],
        },
      },
    }));
  };

  const [statsView, setStatsView] =
    useState("week");

  
  const prayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

  return (
    <div className="min-h-screen p-4">
      <div className="mx-auto w-full max-w-md sm:max-w-lg md:max-w-xl">
        <h1 className="mb-6 text-center text-2xl font-mono font-semibold sm:text-3xl md:text-4xl">
          Deeds Tracker
        </h1>

        <NavigateDates selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>

        <div className="mt-6 space-y-4">
          {prayers.map((namaaz) => (
            <NamaazCard
              key={namaaz}
              namaaz={namaaz}
              todayData={namaazData[dateKey] || createEmptyDay()}
              updatePrayerStatus={updatePrayerStatus}
            />
          ))}
        </div>

        <div className="tabs tabs-boxed justify-center mb-6">
          <button
            className={`tab ${statsView === "week" ? "tab-active" : ""
              }`}
            onClick={() => setStatsView("week")}
          >
            7 Days
          </button>

          <button
            className={`tab ${statsView === "month" ? "tab-active" : ""
              }`}
            onClick={() => setStatsView("month")}
          >
            28 Days
          </button>

          {statsView === "week" && (
            <PrayerHeatmap
              namaazData={namaazData}
              days={14}
            />
          )}

          {statsView === "month" && (
            <PrayerHeatmap
              namaazData={namaazData}
              days={14}
            />
          )}

        </div>

        <Stats namaazData={namaazData} />
        
      </div>
    </div>
  )
}

export default App