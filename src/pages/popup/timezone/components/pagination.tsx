import { Button, Flex, InputNumber } from 'antd';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
  handlePrevPage: () => void;
  handleNextPage: () => void;
}
export default function Pagination({
  currentPage,
  totalPages,
  handlePageChange,
  handlePrevPage,
  handleNextPage,
}: PaginationProps) {
  return (
    <Flex gap={5} align={'center'}>
      <Button
        disabled={currentPage <= 1}
        onClick={handlePrevPage}
        icon={<BsChevronLeft />}
        type={'text'}
      />
      <InputNumber
        min={1}
        max={totalPages}
        value={currentPage}
        onChange={(v) => handlePageChange(v as number)}
      />
      {'/ '}
      {totalPages}
      <Button
        disabled={currentPage >= totalPages}
        onClick={handleNextPage}
        icon={<BsChevronRight />}
        type={'text'}
      />
    </Flex>
  );
}
