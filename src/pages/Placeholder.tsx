import React from "react";

interface PlaceholderProps {
  title?: string;
  description?: string;
}

const Placeholder: React.FC<PlaceholderProps> = ({
  title = "Раздел в разработке",
  description = "Этот раздел ещё не реализован. Пожалуйста, зайдите позже.",
}) => {
  return (
    <div className="text-gray-800 text-sm">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default Placeholder;

