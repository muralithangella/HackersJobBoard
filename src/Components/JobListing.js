const JobListing = ({ url, title, by, time }) => {
  const formatTime = new Date(time * 1000).toLocaleString();
  return (
    <div className="Posts">
      <h1 className="Posts__title">
        <a href={url ? "" : "Posts_Inactive"} target="_blank">
          {title}
        </a>
      </h1>
      <span>
        by {by} {formatTime}
      </span>
    </div>
  );
};
export default JobListing;
