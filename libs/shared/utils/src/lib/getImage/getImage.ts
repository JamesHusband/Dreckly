const convertToKebabCase = (str: string): string => {
  return str
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

const getFallbackImage = (width = 200, height = 200): string => {
  return `https://via.placeholder.com/${width}x${height}?text=Image+Not+Found`;
};

export const getImage = (
  type: 'logo' | 'cover' | 'menu',
  restaurantName: string,
  itemName?: string,
  extension = 'webp'
): string => {
  try {
    const formattedRestaurantName = convertToKebabCase(restaurantName);

    if (type === 'menu' && !itemName) {
      throw new Error('Item name is required for menu images');
    }

    const basePath = `/images/restaurant/${formattedRestaurantName}`;

    switch (type) {
      case 'logo':
        return `${basePath}/logo/${formattedRestaurantName}.${extension}`;
      case 'cover':
        return `${basePath}/cover/${formattedRestaurantName}.${extension}`;
      case 'menu': {
        if (!itemName) {
          throw new Error('Item name is required for menu images');
        }
        const formattedItemName = convertToKebabCase(itemName);
        return `${basePath}/menu/${formattedItemName}.${extension}`;
      }
      default:
        throw new Error(`Unknown image type: ${type}`);
    }
  } catch {
    return getFallbackImage();
  }
};
