import { Fragment, useEffect, useMemo, useRef } from "react";
import { formateDateKey } from "../utils/formatDate";

const prayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

const statusColor = {
    jamaat: "bg-green-500",
    individual: "bg-blue-500",
    qaza: "bg-yellow-400",
    none: "bg-base-300",
};

function NamaazHeatmap({ namaazData, minDays = 14 }) {
    const scrollRef = useRef(null);

    const dateRange = useMemo(() => {
        const dataKeys = Object.keys(namaazData || {}).sort();

        // show atleast 14 days
        if (dataKeys.length === 0) {
            return Array.from({ length: minDays }, (_, i) => {
                const d = new Date();
                d.setDate(d.getDate() - (minDays - 1 - i));
                return d;
            });
        }

        const firstDataDate = new Date(dataKeys[0]);
        const lastDataDate = new Date(dataKeys[dataKeys.length - 1]);

        const today = new Date();

        // Use the latest of today or latest data date
        const endDate = lastDataDate > today ? lastDataDate : today;

        const diffDays =
            Math.floor(
                (endDate - firstDataDate) / (1000 * 60 * 60 * 24)
            ) + 1;

        const totalDays = Math.max(minDays, diffDays);

        const startDate = new Date(endDate);
        startDate.setDate(endDate.getDate() - (totalDays - 1));

        return Array.from({ length: totalDays }, (_, i) => {
            const d = new Date(startDate);
            d.setDate(startDate.getDate() + i);
            return d;
        });
    }, [namaazData, minDays]);

    // Auto-scroll to latest date (right side)
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft =
                scrollRef.current.scrollWidth;
        }
    }, [dateRange.length]);

    return (
        <div ref={scrollRef} className="w-full overflow-x-auto mb-4">
            <div
                className="inline-grid gap-1 min-w-max"
                style={{ gridTemplateColumns: `80px repeat(${dateRange.length}, minmax(16px, 1fr))`, }}
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
                    <Fragment key={prayer}>
                        <div className=" sticky left-0 z-10 bg-base-200 flex items-center whitespace-nowrap text-xs sm:text-sm font-semibold px-2">
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
                                    className={`h-4 w-4 sm:h-5 sm:w-5 rounded ${statusColor[status]}`}
                                />
                            );
                        })}
                    </Fragment>
                ))}
            </div>
        </div>
    );
}

export default NamaazHeatmap;