function Repository(props) {
  const getTimeAgo = dateString => {
    const updatedDate = new Date(dateString);
    const currentDate = new Date();
    const seconds = Math.floor((currentDate - updatedDate) / 1000);

    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
    };

    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / secondsInUnit);
      if (interval >= 1) {
        return `${interval} ${unit}${interval === 1 ? '' : 's'} ago`;
      }
    }

    return 'just now';
  };

  return (
    <>
      <div className="repo-containter p-3  ">
        <h2>{props.name}</h2>
        <p>{props.description}</p>

        <div className="d-flex justify-content-between flex-row">
          <div>
            {props.licence && (
              <span className="pe-2">
                <img src="Chield_alt.svg" alt="" /> {props.licence}
              </span>
            )}
            <span className="pe-2">
              <img src="Nesting.svg" alt="" /> {props.forks}
            </span>
            <span>
              <img src="Star.svg" alt="" /> {props.watchers}
            </span>
          </div>
          <div className="update-time">{getTimeAgo(props.updatedDate)}</div>
        </div>
      </div>
    </>
  );
}

export default Repository;
