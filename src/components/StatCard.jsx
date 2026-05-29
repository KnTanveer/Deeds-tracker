function StatCard({ color, title, value }) {
    const colorCss = `text-${color}-300`;

    return (
        <div className="badge badge-lg sm:badge-md">
            <p className={colorCss}>{title}</p>
            {value}
        </div>
    );
}

export default StatCard;