import { Segmented, Flex } from 'antd';
import React from 'react';
import TimeFormatInput from '@/components/time-format-input.tsx';
import { DateTime } from 'luxon';

interface TimeControlsProps {
  timeMode: string;
  setTimeMode: (mode: string) => void;
  onManualChange?: (dateTime: DateTime) => void;
}

export function TimeControls({
  timeMode,
  setTimeMode,
  onManualChange,
}: TimeControlsProps) {
  return (
    <Flex vertical gap={2}>
      <Segmented<string>
        options={[i18n.t('datetime.now'), i18n.t('datetime.manual')]}
        value={timeMode}
        onChange={setTimeMode}
        block
      />
      <div
        style={{
          display: timeMode === i18n.t('datetime.manual') ? 'block' : 'none',
        }}
      >
        <TimeFormatInput onDateTimeChange={onManualChange} />
      </div>
    </Flex>
  );
}
