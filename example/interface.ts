export interface CommonData {
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
  crued?: string;
  /**
   * 无症状
   */
  asymptomatic?: string;
  /**
   * 无症状，较昨日
   */
  asymptomaticRelative?: string;
  /**
   * 本土新增
   */
  nativeRelative?: string;
  /**
   * 现有确诊
   */
  curConfirm?: string;
  confirmedRelative?: string;
}

export interface SummaryData extends Omit<CommonData, 'nativeRelative'>{
  /**
   * 治愈人数
   */
  cured?: string;

  /**
   * 疑似病例
   */
  unconfirmed?: string;
  relativeTime?: string;
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
   * 现有确诊，较昨日
   */
  curConfirmRelative?: string;
  icuDisable?: string;
}

export interface ProvinceData extends CommonData  {
  relativeTime?: string;
  diedRelative?: string;
  curedRelative?: string;
  overseasInputRelative?: string;
  icuDisable?: string;
  area: string;
  subList: Array<any>;
}

export interface AreaData extends CommonData {
  city: string;
  cityCode?: string;
}

export interface Data {
  updatedTime?: string;
  summaryDataIn?: SummaryData;
  summaryDataOut?: SummaryData;
  provinceData?: Array<ProvinceData>;
}

export interface DataJSON {
  [propName: string]: any
}
