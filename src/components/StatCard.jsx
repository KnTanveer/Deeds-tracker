function StatCard({ title, value }) {

    return (
        <div className="badge badge-md sm:badge-lg">
            <p>{title}</p>
            {value}
        </div>
    );
}

export default StatCard;