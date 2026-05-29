import { formateDateKey, formatRedeableDate } from "../utils/formatDate";

function NavigateDates({ selectedDate, setSelectedDate}) {
    const header = formatRedeableDate(selectedDate);

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

    return (
        <div className="mb-6 flex items-center justify-center mx-auto w-full max-w-90">
            <button
                onClick={goToPreviousDay}
                className="rounded-lg px-3 py-2 text-lg hover:bg-gray-100"
            >
                ←
            </button>

            <p className="min-w-45 text-center text-md font-lg">
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
                className={`btn btn-outline ${isToday ? "invisible" : "visible hover:bg-gray-100"}`}
            >
                ↺
            </button>
        </div>
    )
}

export default NavigateDates