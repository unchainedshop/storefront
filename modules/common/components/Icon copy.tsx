const Icon = ({ icon, className = '' }) => {
  return (
    <span className={`icon ${className}`}>
      <img
        src={`/static/img/icon-streamline/${icon}.svg`}
        className="text-white"
      />
    </span>
  );
};

export default Icon;
