export interface SummaryData {
  /**
   * 累计确诊
   */
  confirmed?: string;
  /**
   * 死亡人数
   */
  died?: string;
  /**
   * 治愈人数
   */
  cured?: string;
  /**
   * 无症状
   */
  asymptomatic?: string;
  /**
   * 无症状，较昨日
   */
  asymptomaticRelative?: string;
  /**
   * 疑似病例
   */
  unconfirmed?: string;
  relativeTime?: string;
  confirmedRelative?: string;
  unconfirmedRelative?: string;
  /**
   * 累计治愈，较昨日
   */
  curedRelative?: string;
  diedRelative?: string;
  /**
   * 现有重症
   */
  icu?: string;
  icuRelative?: string;
  /**
   * 境外输入
   */
  overseasInput?: string;
  unOverseasInputCumulative?: string;
  /**
   * 境外输入，较昨日
   */
  overseasInputRelative?: string;
  unOverseasInputNewAdd?: string;
  /**
   * 现有确诊
   */
  curConfirm?: string;
  /**
   * 现有确诊，较昨日
   */
  curConfirmRelative?: string;
  icuDisable?: string;
}

// 获取 html 内指定内容函数类型
export type GetSpecifyData = (html: string) => Promise<any>;

