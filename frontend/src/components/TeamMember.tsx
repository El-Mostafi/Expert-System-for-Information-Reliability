import React from 'react';

interface TeamMemberProps {
  member: {
    id: number;
    name: string;
    role: string;
    image: string;
  };
}

const TeamMember: React.FC<TeamMemberProps> = ({ member }) => {
  return (
    <div className="card text-center">
      <img 
        src={member.image} 
        alt={member.name} 
        className="w-32 h-32 object-cover rounded-full mx-auto mb-4 border-4 border-white shadow-md"
      />
      <h3 className="font-bold text-lg mb-1">{member.name}</h3>
      <p className="text-blue-600">{member.role}</p>
    </div>
  );
};

export default TeamMember;