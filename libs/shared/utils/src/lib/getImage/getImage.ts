const toKebabCase = (str: string): string => {
  return str
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

const getPlaceholderImage = (width = 200, height = 200): string => {
  return `https://kzmkxsodp5ri9jc22k4a.lite.vusercontent.net/placeholder.svg?height=${height}&width=${width}`;
};

export const getImage = (
  type: 'logo' | 'cover' | 'menu',
  restaurantName: string,
  itemName?: string,
  extension = 'webp'
): string => {
  try {
    const kebabCaseName = toKebabCase(restaurantName);

    if (type === 'menu' && !itemName) {
      throw new Error('Item name is required for menu images');
    }

    const basePath = `/images/restaurant/${kebabCaseName}`;

    switch (type) {
      case 'logo':
        return `${basePath}/logo/${kebabCaseName}.${extension}`;
      case 'cover':
        return `${basePath}/cover/${kebabCaseName}.${extension}`;
      case 'menu': {
        const kebabCaseItemName = toKebabCase(itemName as string);
        return `${basePath}/menu/${kebabCaseItemName}.${extension}`;
      }
      default:
        throw new Error(`Unknown image type: ${type}`);
    }
  } catch {
    return getPlaceholderImage();
  }
};

export { getPlaceholderImage };
