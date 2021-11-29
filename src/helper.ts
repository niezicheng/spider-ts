import dayjs from 'dayjs';
import { SummaryData } from './interface';

export const formatDate = (date: (Date | number | string | undefined), formatType: string = 'YYYY-MM-DD HH:mm:ss') =>
  dayjs(date || new Date()).format(formatType);

/**
 * 格式化数据信息
 * @param summaryData 需要格式化的数据信息
 * @returns 格式化后的 JSON 数据
 */
export const formatDataInfo = (summaryData: SummaryData) => {
  let dataJson: any= {};
  const {
    died,
    cured,
    confirmed,
    curConfirm,
    relativeTime,
    unconfirmed
  } = summaryData;

  dataJson[formatDate(new Date())] = {
    '累计确诊' : confirmed,
    '死亡人数' : died,
    '治愈人数' : cured,
    '当前确诊人数': curConfirm,
    '疑似病例': unconfirmed,
    '日期': formatDate(Number(relativeTime) * 1000)
  }

  return JSON.stringify(dataJson);
}