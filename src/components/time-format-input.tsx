import { Button, Flex, Input, Select } from 'antd';
import { dateTimeFormats } from '@/constants/date-time-formats.ts';
import React from 'react';
import { DateTimeFormats } from '@/types/datetime-formats.ts';
import { DateTime } from 'luxon';
import { parseDateTime } from '@/utils/datetime.ts';
import { BsQuestionCircle } from 'react-icons/bs';

interface TimeFormatInputProps {
  inputValProps?: React.ComponentProps<typeof Input>;
  inputFormatProps?: React.ComponentProps<typeof Input>;
  selectProps?: React.ComponentProps<typeof Select>;
  onDateTimeChange?: (dateTime: DateTime) => void;
}
export default function TimeFormatInput({
  inputValProps,
  inputFormatProps,
  selectProps,
  onDateTimeChange,
}: TimeFormatInputProps) {
  const [dateTime, setDateTime] = useState<DateTime>(DateTime.now());
  const [input, setInput] = useState('');
  const [customFormat, setCustomFormat] = useState('');
  const [dateFormat, setDateFormat] = useState<DateTimeFormats>('iso');
  const parse = (value: string | null = null, format: string | null = null) => {
    const parse = parseDateTime(
      value || input,
      dateFormat,
      format || customFormat,
    );
    if (!parse) {
      setDateTime(DateTime.fromMillis(0));
      return;
    }
    setDateTime(parse);
  };
  const handleManualChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    parse(value);
  };
  const handleCustomFormatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomFormat(value);
    if (dateFormat === 'custom') {
      parse(null, value);
    }
  };
  useEffect(() => {
    if (onDateTimeChange) onDateTimeChange(dateTime);
  }, [dateTime]);
  return (
    <Flex vertical gap={5}>
      <Flex gap={5} align={'center'}>
        <Input
          value={input}
          placeholder={'...'}
          onChange={handleManualChange}
          {...inputValProps}
        />
        <Select
          value={dateFormat}
          onChange={(value) => setDateFormat(value as DateTimeFormats)}
          style={{ width: 200 }}
          options={Object.entries(dateTimeFormats).map(([key, val]) => ({
            label: val,
            value: key,
          }))}
          {...selectProps}
        />
      </Flex>
      {dateFormat === 'custom' && (
        <Flex gap={5} align={'center'}>
          <Input
            value={customFormat}
            placeholder={'yyyy-LL-dd HH:mm:ss'}
            onChange={handleCustomFormatChange}
            {...inputFormatProps}
          />
          <Button
            target={'_blank'}
            href={
              'https://github.com/moment/luxon/blob/master/docs/formatting.md#table-of-tokens'
            }
            icon={<BsQuestionCircle />}
            type={'text'}
            shape={'circle'}
          />
        </Flex>
      )}
    </Flex>
  );
}
