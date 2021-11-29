import dayjs from 'dayjs';

export const formatDate = (date: (Date | number | string | undefined), formatType: string = 'YYYY-MM-DD HH:mm:ss') =>
  dayjs(date || new Date()).format(formatType);