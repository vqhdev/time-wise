import React from 'react';
import { Empty, Flex, Input, Switch } from 'antd';
import useTimezone from '@/hooks/timezone.tsx';
import { TimeZone } from '@vvo/tzdb';
import useGlobalTime from '@/hooks/use-global-time.tsx';
import { DateTime } from 'luxon';
import { MdOutlineLocationOff } from 'react-icons/md';
import TimeZoneCard from '@/pages/popup/timezone/components/timezone-card.tsx';
import { TimeControls } from '@/pages/popup/timezone/components/time-controls.tsx';
import Pagination from '@/pages/popup/timezone/components/pagination.tsx';
import { useLoadingStore } from '@/stores/loading.ts';

export default function PopupTimeZonePage() {
  const { setIsLoading } = useLoadingStore();
  const globalTime = useGlobalTime();
  const [manualDateTime, setManualDateTime] = useState<DateTime>(
    DateTime.now(),
  );
  const [timeMode, setTimeMode] = useState<string>(i18n.t('datetime.now'));
  const currentDateTime: DateTime =
    timeMode === i18n.t('datetime.now') ? globalTime : manualDateTime;
  const {
    isPending,
    currentTimezones,
    currentPage,
    totalPages,
    handlePageChange,
    handlePrevPage,
    handleNextPage,
    searchTerm,
    handleSearch,
    favorites,
    handleToggleFavorite,
    hour24,
    handleToggleHour24,
  } = useTimezone({
    itemsPerPage: 10,
    debounceDelay: 300,
  });
  useEffect(() => {
    setIsLoading(isPending);
  }, [isPending]);
  if (isPending) {
    return null;
  }
  return (
    <Flex
      vertical
      style={{
        height: '100%',
      }}
    >
      <Flex
        vertical
        gap={5}
        style={{
          padding: 5,
        }}
      >
        <TimeControls
          timeMode={timeMode}
          setTimeMode={setTimeMode}
          onManualChange={setManualDateTime}
        />
        <Input
          placeholder={i18n.t('search.placeholder')}
          defaultValue={searchTerm}
          onChange={handleSearch}
        />
      </Flex>
      <Flex
        gap={10}
        vertical
        style={{
          overflowY: 'auto',
          overflowX: 'hidden',
          scrollbarGutter: 'stable',
          scrollbarWidth: 'thin',
          height: '100%',
        }}
      >
        {currentTimezones.length > 0 ? (
          currentTimezones.map((timezone: TimeZone) => (
            <TimeZoneCard
              timezone={timezone}
              key={timezone.name}
              favorites={favorites}
              handleToggleFavorite={handleToggleFavorite}
              hour24={hour24}
              currentDateTime={currentDateTime}
            />
          ))
        ) : (
          <Empty
            image={
              <MdOutlineLocationOff
                size={60}
                style={{
                  opacity: 0.5,
                }}
              />
            }
            description={i18n.t('datetime.errors.no_timezone_found')}
          />
        )}
      </Flex>
      <Flex
        style={{
          padding: 5,
        }}
        align={'center'}
        justify={'space-between'}
      >
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
        />
        <Switch
          checkedChildren="24H"
          unCheckedChildren="12H"
          checked={hour24}
          onChange={handleToggleHour24}
        />
      </Flex>
    </Flex>
  );
}
