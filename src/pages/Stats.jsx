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
            const allPrayed = Object.values(day).every(
                (prayer) => prayer.status !== "none"
            );

            if (allPrayed) {
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
        <div className="flex justify-center px-4 py-8">
            <div className="card bg-base-100 w-full max-w-4xl shadow-xl rounded-3xl p-6">

                <NamaazHeatmap namaazData={namaazData} />

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
    );
}

export default Stats;