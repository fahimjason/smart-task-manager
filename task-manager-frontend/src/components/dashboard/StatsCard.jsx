const StatsCard = ({ title, value, subtitle }) => {
  return (
    <div className="p-3 rounded shadow-sm bg-white">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-2xl font-bold">{value}</div>
      {subtitle && <div className="text-xs text-gray-400">{subtitle}</div>}
    </div>
  );
};

export default StatsCard;
