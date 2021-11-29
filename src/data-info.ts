import cheerio from 'cheerio';
import { SummaryData } from './interface';
import { formatDate } from './helper';

class DataInfo {
  private pageData: string | undefined; // 页面数据信息

  private static instance: DataInfo; // DataInfo 类实例

  static getInstance () {
    if (!DataInfo.instance) {
      DataInfo.instance = new DataInfo();
    }

    return DataInfo.instance;
  }

  /**
   * 获取页面指定内容
   * @param html 页面 html
   * @returns
   */
  getDataInfo = (html: string): Promise<string> => {
    const $ = cheerio.load(html);

    return new Promise((resolve, reject) => {
      if (($('script')[11]?.children[0] as any)?.data) {
        this.pageData = ($('script')[11]?.children[0] as any)?.data;
        if (this.pageData) {
          const sumData = JSON.parse(this.pageData);

          resolve(this.formatDataInfo(sumData.component[0].summaryDataIn));
        }
      }

      reject('获取数据失败');
    });
  }

  // 格式化数据信息
  formatDataInfo = (summaryData: SummaryData) => {
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

}

export default DataInfo;