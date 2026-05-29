import NamaazCard from "./components/NamaazCard";
import { formateDateKey, formatRedeableDate } from "./utils/formatDate";
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

  // previous & next dates
  const goToPreviousDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 1);

    setSelectedDate(newDate);
  };

  const goToNextDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 1);
    const today = new Date();

    if (formateDateKey(newDate) > formateDateKey(today)) {
      return;
    }

    setSelectedDate(newDate);
  };

  // navigate to today
  const isToday = formateDateKey(selectedDate) === formateDateKey(new Date());
  function goToToday() {
    const today = new Date();

    setSelectedDate(today);
  };

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

  const header = formatRedeableDate(selectedDate);
  const prayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

  return (
    <div className="min-h-screen p-4">
      <div className="mx-auto w-full max-w-md sm:max-w-lg md:max-w-xl">
        <h1 className="mb-6 text-center text-2xl font-mono font-semibold sm:text-3xl md:text-4xl">
          Deeds Tracker
        </h1>

        <div className="mb-6 flex items-center justify-center mx-auto w-full max-w-90">
          <button
            onClick={goToPreviousDay}
            className="rounded-lg px-3 py-2 text-lg hover:bg-gray-100"
          >
            ←
          </button>

          <p className="min-w-45 text-center text-md font-lg sm:text-sm">
            {header}
          </p>

          <button
            onClick={goToNextDay}
            className="rounded-lg px-3 py-2 text-lg hover:bg-gray-100"
          >
            →
          </button>

          <button
            onClick={goToToday}
            className={`btn btn-outline ${isToday ? "invisible" : "visible hover:bg-gray-100" }`}
          >
            ↺
          </button>
        </div>

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
      </div>
    </div>
  )
}

export default App