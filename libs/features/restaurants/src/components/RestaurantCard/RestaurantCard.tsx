import { Restaurant } from '@dreckly/types';
import Link from 'next/link';
import Image from 'next/image';
import { RestaurantMeta } from '../RestaurantMeta';

export const RestaurantCard = ({
  id,
  image,
  name,
  cuisine,
  rating,
  deliveryTime,
  deliveryFee,
  featured,
}: Restaurant): React.JSX.Element => {
  return (
    <Link
      key={id}
      href={`/restaurant/${id}`}
      className="bg-white hover:shadow-lg transition-shadow cursor-pointer overflow-hidden rounded-lg border text-left block"
    >
      <div className="relative">
        <Image
          src={image || '/placeholder.svg'}
          alt={name}
          width={300}
          height={200}
          className="w-full h-40 object-cover"
        />
        {featured && (
          <span className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded text-sm">
            Featured
          </span>
        )}
      </div>
      <RestaurantMeta
        name={name}
        cuisine={cuisine}
        rating={rating}
        deliveryTime={deliveryTime}
        deliveryFee={deliveryFee}
        variant="card"
      />
    </Link>
  );
};
