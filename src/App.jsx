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
      <div className="mx-auto max-w-md">
        <h1 className="mb-6 text-center text-3xl font-mono font-semibold">Deeds Tracker</h1>

        <div className="flex justify-center items-center gap-3">
          <button onClick={goToPreviousDay} className="text-lg"> {'\u2190'} </button>

          <p className="text-lg text-center min-w-44">{header}</p>

          <button onClick={goToNextDay} className="text-lg"> {'\u2192'} </button>

          {!isToday && (
            <button onClick={goToToday} className="btn">
              Today {'\u21BA'}
            </button>
          )}
        </div>

        <div className="space-y-3">
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