import cheerio from 'cheerio';
import { SITE_URL } from './constant';
import { formatDataInfo, formatDate } from './helper';
import Spider from '../src/index';

// 获取指定内容信息
const getSpecifyData = (html: string): Promise<string> => {
  const $ = cheerio.load(html);

  return new Promise((resolve, reject) => {
    if (($('script')[11]?.children[0] as any)?.data) {
      const pageData = ($('script')[11]?.children[0] as any)?.data;
      const sumData = JSON.parse(pageData);

      const updatedTime = formatDate(sumData.component[0].mapLastUpdatedTime); // 更新时间
      const summaryDataIn = sumData.component[0].summaryDataIn; // 国内
      const summaryDataOut = sumData.component[0].summaryDataOut; // 国外
      const provinceData = sumData.component[0].caseList; // 省

      // console.log(updatedTime, sumData, summaryDataIn, provinceData)

      resolve(formatDataInfo({
        updatedTime,
        summaryDataIn,
        summaryDataOut,
        provinceData
      }));
    }

    reject('获取数据失败');
  });
}

new Spider(SITE_URL, getSpecifyData);