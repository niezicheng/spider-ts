import dayjs from 'dayjs';
import  { forEach } from 'lodash';
import { ProvinceData, Data, AreaData, DataJSON } from './interface';

export const formatDate = (date: (Date | number | string | undefined), formatType: string = 'YYYY-MM-DD HH:mm:ss') =>
  dayjs(date || new Date()).format(formatType);


export const returnDataType = (type: string, data: any) => {
  switch(type) {
    case '国内':
    case '国外':
      return {
        '现有确诊' : data?.curConfirm,
        '无症状' : data?.asymptomatic,
        '现有可疑' : data?.unconfirmed,
        '现有重症': data?.icu,
        '累计确诊': data?.confirmed,
        '境外输入': data?.overseasInput,
        '累计治愈': data?.cured,
        '累计死亡': data?.died,
        '当前数据相对日期': formatDate(Number(data?.relativeTime) * 1000)
      }
    case '省份':
      return {
        '新增确诊': data?.curConfirmRelative,
        '新增本土': data?.nativeRelative,
        '新增境外': data?.overseasInputRelative,
        '新增无症状': data?.asymptomaticRelative,
        '现有确诊' : data?.curConfirm,
        '累计确诊' : data?.confirmed,
        '累计治愈' : data?.crued,
        '累计死亡' : data?.died,
        '当前数据相对日期': formatDate(Number(data?.relativeTime) * 1000)
      }
    case '市区':
      return {
        '新增本土': data?.nativeRelative,
        '新增无症状': data?.asymptomaticRelative,
        '现有确诊' : data?.curConfirm,
        '累计确诊' : data?.confirmed,
        '累计治愈' : data?.crued,
        '累计死亡' : data?.died,
        '当前数据相对日期': formatDate(Number(data?.relativeTime) * 1000)
      }
    default:
      return {
        msg: '未匹配数据格式类型'
      }
  }
}

/**
 * 格式化数据信息
 * @param summaryData 需要格式化的数据信息
 * @returns 格式化后的 JSON 数据
 */
export const formatDataInfo = (data: Data) => {
  const {
    updatedTime,
    summaryDataIn,
    summaryDataOut,
    provinceData
  } = data;
  let dataJson: DataJSON = {};

  dataJson['数据更新时间'] = updatedTime;
  dataJson['国内'] = returnDataType('国内', summaryDataIn);
  dataJson['国外'] = returnDataType('国外', summaryDataOut);

  forEach(provinceData, (province: ProvinceData) => {
    dataJson[province?.area] = returnDataType('省份', province);

    forEach(province?.subList, (area: AreaData) => {
      dataJson[province?.area][area?.city] = returnDataType('市区', area)
    })
  })

  return JSON.stringify(dataJson);
}