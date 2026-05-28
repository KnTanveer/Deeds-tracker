function NamaazCard({ namaaz, todayData, updatePrayerStatus }) {

    return (
        <div>
            <div className="card bg-base-100 max-w-90 shadow-sm p-4 rounded-2xl m-3 flex">
                <div className="flex items-center justify-between flex-1">

                    <p className="text-lg font-semibold tracking-wide">
                        {namaaz}
                    </p>

                    <div className="flex items-center gap-3">
                        <input
                            type="radio" name={namaaz}
                            checked={todayData?.[namaaz].status === "jamaat"}
                            onChange={() => updatePrayerStatus(namaaz, "jamaat")}
                            className="radio bg-green-100 border-green-300 checked:bg-green-200 checked:text-green-600 checked:border-green-600" />

                        <input
                            type="radio" name={namaaz}
                            checked={todayData?.[namaaz].status === "individual"}
                            onChange={() => updatePrayerStatus(namaaz, "individual")}
                            className="radio bg-blue-100 border-blue-300 checked:bg-blue-200 checked:text-blue-600 checked:border-blue-600" />

                        <input
                            type="radio" name={namaaz}
                            checked={todayData?.[namaaz].status === "qaza"}
                            onChange={() => updatePrayerStatus(namaaz, "qaza")}
                            className="radio bg-yellow-100 border-yellow-300 checked:bg-yellow-200 checked:text-yellow-600 checked:border-yellow-600" />

                        <input
                            type="radio" name={namaaz}
                            checked={todayData?.[namaaz].status === "none"}
                            onChange={() => updatePrayerStatus(namaaz, "none")}
                            className="radio bg-gray-100 border-gray-300 checked:bg-gray-200 checked:text-gray-600 checked:border-gray-600" />

                    </div>

                </div>
            </div>
        </div>
    )
}

export default NamaazCard