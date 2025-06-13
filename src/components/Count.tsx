import { useEffect, useState } from 'react';

interface CountdownProps {
  targetDate: string;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const target = new Date(targetDate);
      const diff = target.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft("It's showtime 💍");
        clearInterval(interval);
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl  bg-gradient-to-r from-amber-100 via-red-300 to-orange-400 bg-clip-text text-transparent">{timeLeft}</h2>;
};

export default Countdown;
