import Link from 'next/link';

interface LogoProps {
  textColor?: 'grey' | 'white';
}

export const Logo = ({ textColor = 'grey' }: LogoProps) => {
  const textColorClass = textColor === 'white' ? 'text-white' : 'text-gray-900';

  return (
    <Link
      href="/"
      className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
    >
      <div className="bg-orange-500 text-white p-2 rounded-lg font-bold text-xl">
        D
      </div>
      <span className={`text-2xl font-bold ${textColorClass}`}>Dreckly</span>
    </Link>
  );
};
