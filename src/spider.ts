import superagent from 'superagent';
import fs from 'fs';
import axios from 'axios';
import { SITE_URL, RES_FILE_PATH } from './constant';
import DataInfo from './data-info';

const dataInfo = DataInfo.getInstance();

class Spider {
  constructor () {
    this.getHtmlContent();
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
  getHtmlContent = async () => {
    // 1. 获取页面 html 信息
    const html = await this.getHtmlByAxios();
    // 2. 获取对应标签内容信息（可以适当处理输入内容格式）
    const data = await dataInfo.getDataInfo(html);
    // 3. 内容写入文件
    this.writeFile(data);
  }
}

new Spider();