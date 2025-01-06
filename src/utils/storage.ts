export const isDarkMode = storage.defineItem<boolean>('local:isDarkMode', {
  fallback: false,
});

export const favoritesTimezone = storage.defineItem<string[]>(
  'sync:favoritesTimezone',
  {
    fallback: [],
  },
);

export const hour24Format = storage.defineItem<boolean>('local:hour24Format', {
  fallback: true,
});
