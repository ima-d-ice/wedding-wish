interface RoastCardProps {
  text: string;
}

const RoastCard: React.FC<RoastCardProps> = ({ text }) => (
  <div className="bg-gradient-to-br from-blue-700/70 via-blue-800/70 to-cyan-600/70 p-6 rounded-xl shadow-2xl m-2 text-center backdrop-blur-sm">
    <p className="text-gray-100 text-lg leading-relaxed">{text}</p>
  </div>
);

export default RoastCard;
