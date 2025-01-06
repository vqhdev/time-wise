import { TimeZone } from '@vvo/tzdb';
import { DateTime } from 'luxon';
import { Button, Card, Flex } from 'antd';
import { MdOutlineLocationOn } from 'react-icons/md';
import { BsStar, BsStarFill } from 'react-icons/bs';
import React from 'react';

interface TimeZoneCardProps {
  timezone: TimeZone;
  favorites: string[];
  handleToggleFavorite: (name: string, isFavorite: boolean) => void;
  hour24: boolean;
  currentDateTime: DateTime;
}

export default function TimeZoneCard({
  timezone,
  favorites,
  handleToggleFavorite,
  hour24,
  currentDateTime,
}: TimeZoneCardProps) {
  const formatTimeString = hour24 ? 'HH:mm:ss' : 'hh:mm:ss a';
  const formatDateString = 'yyyy-MM-dd';
  const formattedTime = currentDateTime
    .setZone(timezone.name)
    .toFormat(formatTimeString);
  const favorited = favorites.includes(timezone.name);
  return (
    <Card>
      <Flex
        align={'center'}
        justify={'space-between'}
        style={{ marginBottom: 12 }}
      >
        <Flex align={'center'} gap={8}>
          <MdOutlineLocationOn size={20} />
          <Flex vertical gap={2}>
            <h4 style={{ margin: 0 }}>{timezone.countryName}</h4>
            <span style={{ color: '#666' }}>{timezone.name}</span>
          </Flex>
        </Flex>
        <Button
          size={'small'}
          type={'text'}
          shape={'circle'}
          onClick={() => handleToggleFavorite(timezone.name, !favorited)}
        >
          {favorited ? (
            <BsStarFill
              style={{
                color: 'red',
              }}
            />
          ) : (
            <BsStar />
          )}
        </Button>
      </Flex>
      <Flex vertical align={'center'} style={{ margin: '16px 0' }}>
        <h1 style={{ margin: 0 }}>{formattedTime}</h1>
      </Flex>
      <Flex align={'center'} justify={'space-between'} gap={3}>
        <div>
          <span style={{ color: '#666' }}>{i18n.t('datetime.date')}</span>
          <h5 style={{ margin: '4px 0' }}>
            {currentDateTime.setZone(timezone.name).toFormat(formatDateString)}
          </h5>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{ color: '#666' }}>{i18n.t('datetime.local_time')}</span>
          <h5 style={{ margin: '4px 0' }}>
            {currentDateTime.toFormat(formatDateString)}{' '}
            {currentDateTime.toFormat(formatTimeString)}
          </h5>
        </div>
      </Flex>
    </Card>
  );
}
