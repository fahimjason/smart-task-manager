const OverloadedMemberCard = ({ member }) => (
    <div className="p-3 rounded shadow-sm bg-white">
        <div className="font-medium">{member?.name}</div>
        <div className="text-xs text-gray-500">Tasks: {member?.tasks ?? 0}</div>
    </div>
);


export default OverloadedMemberCard;