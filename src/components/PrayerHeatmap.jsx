import { formateDateKey } from "../utils/formatDate";

const prayers = [
    "Fajr",
    "Dhuhr",
    "Asr",
    "Maghrib",
    "Isha",
];

const statusColor = {
    jamaat: "bg-green-500",
    individual: "bg-blue-500",
    qaza: "bg-yellow-400",
    none: "bg-base-300",
};

export default function PrayerHeatmap({
    namaazData,
    days = 28,
}) {
    const dateRange = Array.from(
        { length: days },
        (_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - (days - 1 - i));
            return d;
        }
    );

    return (
        <div className="w-full overflow-x-auto">
            <div
                className="inline-grid gap-1"
                style={{
                    gridTemplateColumns: `80px repeat(${days}, minmax(16px, 1fr))`,
                }}
            >
                <div />

                {dateRange.map((day) => (
                    <div
                        key={day.toISOString()}
                        className="text-[10px] text-center text-base-content/60"
                    >
                        {day.getDate()}
                    </div>
                ))}

                {prayers.map((prayer) => (
                    <>
                        <div
                            key={prayer}
                            className="flex items-center text-xs sm:text-sm font-semibold"
                        >
                            {prayer}
                        </div>

                        {dateRange.map((day) => {
                            const key = formateDateKey(day);

                            const status =
                                namaazData?.[key]?.[prayer]?.status ||
                                "none";

                            return (
                                <div
                                    key={`${prayer}-${key}`}
                                    title={`${prayer}: ${status}`}
                                    className={`
                    h-4 w-4
                    sm:h-5 sm:w-5
                    rounded
                    ${statusColor[status]}
                  `}
                                />
                            );
                        })}
                    </>
                ))}
            </div>
        </div>
    );
}