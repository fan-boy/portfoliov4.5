import React from "react";

interface InsightCardProps {
  title: string;
  description: string;
}

const InsightCard: React.FC<InsightCardProps> = ({ title, description }) => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
      <h4 className="text-lg text-fontprimary font-normal mb-2">{title}</h4>
      <p className="text-fonttertiary text-sm leading-relaxed">{description}</p>
    </div>
  );
};

export default InsightCard;
