import clsx from 'clsx';
import Link from "next/link";

interface NavigationItemProps {
  label: string;
  icon: any;
  href: string;
  onClick?: () => void;
  active?: boolean;
}

const NavigationItem: React.FC<NavigationItemProps> = ({
  label,
  href,
  icon: Icon,
  active,
  onClick
}) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };

  return (
    <li onClick={handleClick} key={label}>
      <Link
        href={href}
        className={clsx(`
            group 
            flex 
            gap-x-3 
            rounded-md 
            p-3 
            text-sm 
            leading-6 
            font-semibold 
            text-gray-500 
            hover:text-black 
            hover:bg-[#108559]/10
          `,
          active && 'bg-[#108559]/10 text-black'
        )}
      >
        <Icon className="h-6 w-6 shrink-0" stroke="#0C8457" aria-hidden="true" />
        <span className="sr-only">{label}</span>
      </Link>
    </li>
  );
}

export default NavigationItem;