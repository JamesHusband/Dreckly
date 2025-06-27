import { Restaurant } from '@dreckly/types';
import Image from 'next/image';
import { RestaurantMeta } from '@dreckly/restaurants';

export const MenuHeader = ({
  image,
  name,
  description,
  rating,
  reviewCount,
  deliveryTime,
  deliveryFee,
  address,
}: Restaurant) => {
  return (
    <div className="relative">
      <Image
        src={image || '/placeholder.svg'}
        alt={name}
        width={800}
        height={300}
        className="w-full h-64 md:h-80 object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40" />
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <div className="container mx-auto">
          <RestaurantMeta
            name={name}
            description={description}
            rating={rating}
            reviewCount={reviewCount}
            deliveryTime={deliveryTime}
            deliveryFee={deliveryFee}
            address={address}
            variant="header"
          />
        </div>
      </div>
    </div>
  );
};
