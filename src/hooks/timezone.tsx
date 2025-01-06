import { getTimeZones, TimeZone } from '@vvo/tzdb';
import { favoritesTimezone, hour24Format } from '@/utils/storage.ts';
import React, { useTransition } from 'react';
import debounce from 'lodash/debounce';
interface UseTimeZoneProps {
  itemsPerPage: number;
  debounceDelay: number;
}
export default function useTimezone({
  itemsPerPage,
  debounceDelay,
}: UseTimeZoneProps) {
  const [timeZones, setTimeZones] = useState<TimeZone[]>([]);
  const [hour24, setHour24] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isPending, startTransition] = useTransition();
  const filterTimezone = useCallback(
    (timezone: TimeZone, searchLower: string) => {
      const {
        name,
        alternativeName,
        countryName,
        countryCode,
        mainCities,
        continentName,
        rawFormat,
        group,
      } = timezone;

      return (
        name.toLowerCase().includes(searchLower) ||
        alternativeName.toLowerCase().includes(searchLower) ||
        countryName.toLowerCase().includes(searchLower) ||
        countryCode.toLowerCase().includes(searchLower) ||
        mainCities.some((city) => city.toLowerCase().includes(searchLower)) ||
        continentName.toLowerCase().includes(searchLower) ||
        rawFormat.toLowerCase().includes(searchLower) ||
        group.filter((gr) => gr.toLowerCase().includes(searchLower)).length > 0
      );
    },
    [],
  );
  const filteredTimezones = useMemo(() => {
    const searchLower = searchTerm.toLowerCase().trim();
    if (!searchLower) return timeZones;
    return timeZones.filter((timezone) =>
      filterTimezone(timezone, searchLower),
    );
  }, [timeZones, searchTerm, filterTimezone]);
  const sortedTimezones = useMemo(() => {
    return filteredTimezones.sort((a, b) => {
      const aFavorite = favorites.includes(a.name);
      const bFavorite = favorites.includes(b.name);
      if (aFavorite && !bFavorite) return -1;
      if (!aFavorite && bFavorite) return 1;
      return 0;
    });
  }, [filteredTimezones, favorites]);
  const paginationData = useMemo(() => {
    const totalPages = Math.ceil(sortedTimezones.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentTimezones = sortedTimezones.slice(startIndex, endIndex);

    return {
      totalPages,
      currentTimezones,
    };
  }, [sortedTimezones, currentPage]);
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);
  useEffect(() => {
    startTransition(async () => {
      try {
        const [allTimezones, savedFavorites, savedHour24] = await Promise.all([
          getTimeZones(),
          favoritesTimezone.getValue(),
          hour24Format.getValue(),
        ]);
        startTransition(() => {
          setTimeZones(allTimezones);
          setFavorites(savedFavorites);
          setHour24(savedHour24);
        });
      } catch (error) {
        console.error(error);
      }
    });
  }, []);
  const handlePrevPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  }, []);

  const handleNextPage = useCallback(() => {
    setCurrentPage((prev) => Math.min(paginationData.totalPages, prev + 1));
  }, [paginationData.totalPages]);

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setSearchTerm(value);
      }, debounceDelay),
    [],
  );

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement> | string) => {
      debouncedSearch(typeof e === 'string' ? e : e.target.value);
    },
    [debouncedSearch],
  );

  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(page);
    },
    [paginationData.totalPages],
  );
  const handleToggleHour24 = useCallback(
    async (checked: boolean) => {
      setHour24(checked);
      await hour24Format.setValue(checked);
    },
    [hour24],
  );
  const handleToggleFavorite = useCallback(
    async (name: string, isFavorite: boolean) => {
      if (isFavorite) {
        setFavorites((prev) => [...prev, name]);
        await favoritesTimezone.setValue([...favorites, name]);
      } else {
        setFavorites((prev) => prev.filter((n) => n !== name));
        await favoritesTimezone.setValue(favorites.filter((n) => n !== name));
      }
    },
    [favorites],
  );
  return {
    isPending,
    favorites,
    searchTerm,
    timeZones,
    hour24,
    currentPage,
    totalPages: paginationData.totalPages,
    currentTimezones: paginationData.currentTimezones,
    handleSearch,
    handlePageChange,
    handlePrevPage,
    handleNextPage,
    handleToggleFavorite,
    handleToggleHour24,
  };
}
