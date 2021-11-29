import superagent from 'superagent';
import cheerio from 'cheerio';
import fs from 'fs';
import axios from 'axios';
import { SITE_URL, RES_FILE_PATH } from './constant';
import { GetSpecifyData } from './interface';
import { formatDataInfo } from './helper';

class Spider {
  constructor (getSpecifyData: GetSpecifyData) {
    this.getHtmlContent(getSpecifyData);
  }

  // 获取页面 html 信息通过 superagent 库
  getHtmlBySuperagent = async () => {
    const res = await (superagent.get(SITE_URL) as any);

    return res.text;
  }

  // 获取页面 html 信息，通过 axios 请求
  getHtmlByAxios = async () => {
    const res = await axios.get(SITE_URL);

    return res.data;
  }

  // 存入数据
  writeFile = (content: string) => {
    fs.writeFileSync(RES_FILE_PATH, content);
  }

  // 获取
  getHtmlContent = async (getSpecifyData: GetSpecifyData) => {
    // 1. 获取页面 html 信息
    const html = await this.getHtmlByAxios();
    // 2. 获取对应标签内容信息（可以适当处理输入内容格式）
    const data = await getSpecifyData(html);
    // 3. 内容写入文件
    this.writeFile(data);
  }
}

// 获取指定内容信息
const getSpecifyData = (html: string): Promise<string> => {
  const $ = cheerio.load(html);

  return new Promise((resolve, reject) => {
    if (($('script')[11]?.children[0] as any)?.data) {
      const pageData = ($('script')[11]?.children[0] as any)?.data;
      const sumData = JSON.parse(pageData);

      console.log(sumData);

      resolve(formatDataInfo(sumData.component[0].summaryDataIn));
    }

    reject('获取数据失败');
  });
}

new Spider(getSpecifyData);