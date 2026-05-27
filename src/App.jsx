import NamaazCard from "./components/NamaazCard";
import { formateDateKey, formatRedeableDate } from "./utils/formatDate";
import { useEffect, useState } from "react";

function App() {
  const dateKey = formateDateKey(new Date());

  // retrive data from local storage at start
  const [namaazData, setNamaazData] = useState(() => {
    const savedData = localStorage.getItem("namaazData");
    let oldData = savedData ? JSON.parse(savedData) : {};

    // create today's data if missing
    if (!oldData[dateKey]) {
      oldData = {
        ...oldData,

        [dateKey]: {
          Fajr: { status: "none", points: 0 },
          Dhuhr: { status: "none", points: 0 },
          Asr: { status: "none", points: 0 },
          Maghrib: { status: "none", points: 0 },
          Isha: { status: "none", points: 0 },
        },
      };
    }

    return oldData;
  });

  // save to local storage on data change
  useEffect(() => {
    localStorage.setItem("namaazData", JSON.stringify(namaazData));
  }, [namaazData]);

  // only for viewing data
  const todayData = namaazData[dateKey];

  const updatePrayerStatus = (prayer, status) => {
    const pointsMap = { jamaat: 5, individual: 3, qaza: 2, none: 0 };

    setNamaazData((oldData) => ({
      ...oldData,

      [dateKey]: {
        ...oldData[dateKey],
        [prayer]: {
          status,
          points: pointsMap[status],
        },
      },
    }));
  };

  const date = new Date();
  const header = formatRedeableDate(date);
  const prayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

  return (
    <div>
      <h1>Deeds Tracker</h1>

      <p>{header}</p>

      {prayers.map((namaaz) => (
        <NamaazCard
          key={namaaz}
          namaaz={namaaz}
          todayData={namaazData[dateKey]}
          updatePrayerStatus={updatePrayerStatus}
        />
      ))}

    </div>
  )
}

export default App