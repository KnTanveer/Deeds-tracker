import StatCard from "../components/StatCard";

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
                (prayer) => prayer.status === "jamaat"
            );

            if (allJamaat) {
                perfectDays++;
            }
        });

        return perfectDays;
    }

    const PRAYERS = [
        "Fajr",
        "Dhuhr",
        "Asr",
        "Maghrib",
        "Isha",
    ];

    function getPrayerStats(data) {
        const stats = {};

        PRAYERS.forEach((prayer) => {
            stats[prayer] = {
                completed: 0,
                total: 0,
            };
        });

        Object.values(data).forEach((day) => {
            PRAYERS.forEach((prayer) => {
                stats[prayer].total++;

                if (day?.[prayer]?.status !== "none") {
                    stats[prayer].completed++;
                }
            });
        });

        return stats;
    }

    function getBestPrayer(data) {
        const stats = getPrayerStats(data);

        let bestPrayer = "";
        let bestRate = -1;

        Object.entries(stats).forEach(([name, value]) => {
            const rate =
                value.total === 0
                    ? 0
                    : value.completed / value.total;

            if (rate > bestRate) {
                bestRate = rate;
                bestPrayer = name;
            }
        });

        return {
            prayer: bestPrayer,
            percentage: Math.round(bestRate * 100),
        };
    }

    function getWeakestPrayer(data) {
        const stats = getPrayerStats(data);

        let weakestPrayer = "";
        let weakestRate = Infinity;

        Object.entries(stats).forEach(([name, value]) => {
            const rate =
                value.total === 0
                    ? 0
                    : value.completed / value.total;

            if (rate < weakestRate) {
                weakestRate = rate;
                weakestPrayer = name;
            }
        });

        return {
            prayer: weakestPrayer,
            percentage: Math.round(weakestRate * 100),
        };
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

    const bestPrayer = getBestPrayer(namaazData);
    const weakestPrayer = getWeakestPrayer(namaazData);

    return (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            <StatCard
                icon="🕌"
                title="Jamaat"
                value={getTotalJamaatCount(namaazData)}
            />

            <StatCard
                icon="🤲"
                title="Prayers"
                value={getTotalPrayerCount(namaazData)}
            />

            <StatCard
                icon="🌟"
                title="Perfect Days"
                value={getPerfectDays(namaazData)}
            />

            <StatCard
                icon="🥇"
                title="Best Prayer"
                value={`${bestPrayer.prayer} (${bestPrayer.percentage}%)`}
            />

            <StatCard
                icon="📉"
                title="Weakest Prayer"
                value={`${weakestPrayer.prayer} (${weakestPrayer.percentage}%)`}
            />

            <StatCard
                title="Total Points"
                value={getTotalPoints(namaazData)}
            />
        </div>
    )
}

export default Stats