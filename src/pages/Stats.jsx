import StatCard from "../components/StatCard";
import NamaazHeatmap from "../components/NamaazHeatmap";

function Stats({ namaazData }) {
    function getTotalJamaatCount(data) {
        let count = 0;

        Object.values(data).forEach((day) => {
            Object.values(day).forEach((prayer) => {
                if (prayer.status === "jamaat") {
                    count++;
                }
            });
        });

        return count;
    }

    function getTotalPrayerCount(data) {
        let count = 0;

        Object.values(data).forEach((day) => {
            Object.values(day).forEach((prayer) => {
                if (prayer.status !== "none") {
                    count++;
                }
            });
        });

        return count;
    }

    function getPerfectDays(data) {
        let perfectDays = 0;

        Object.values(data).forEach((day) => {
            const allJamaat = Object.values(day).every(
                (prayer) => prayer.status !== "none"
            );

            if (allJamaat) {
                perfectDays++;
            }
        });

        return perfectDays;
    }

    function getTotalPoints(data) {
        return Object.values(data).reduce((total, day) => {
            return (
                total +
                Object.values(day).reduce(
                    (sum, prayer) => sum + prayer.points,
                    0
                )
            );
        }, 0);
    }

    return (
        <div className="min-h-screen p-4">
            <div className="mx-auto w-full max-w-md sm:max-w-lg md:max-w-xl">
                <NamaazHeatmap
                    namaazData={namaazData}
                    days={14}
                />

                <div className="grid gap-3 grid-cols-2 ">
                    <StatCard
                        title="Total Prayers"
                        value={getTotalPrayerCount(namaazData)}
                    />

                    <StatCard
                        title="Jamaat"
                        value={getTotalJamaatCount(namaazData)}
                    />

                    <StatCard
                        title="Total Points"
                        value={getTotalPoints(namaazData)}
                    />

                    <StatCard
                        title="Perfect Days"
                        value={getPerfectDays(namaazData)}
                    />
                </div>
            </div>
        </div>
    )
}

export default Stats