import superagent from 'superagent';
import fs from 'fs';
import axios from 'axios';
import { RES_FILE_PATH } from '../example/constant';
import { GetSpecifyData } from './interface';

export default class Spider {
  constructor (url: string, getSpecifyData: GetSpecifyData) {
    this.getHtmlContent(url, getSpecifyData);
  }

  // 获取页面 html 信息通过 superagent 库
  getHtmlBySuperagent = async (url: string) => {
    const res = await (superagent.get(url) as any);

    return res.text;
  }

  // 获取页面 html 信息，通过 axios 请求
  getHtmlByAxios = async (url: string) => {
    const res = await axios.get(url);

    return res.data;
  }

  // 存入数据
  writeFile = (content: string) => {
    fs.writeFileSync(RES_FILE_PATH, content);
  }

  // 获取
  getHtmlContent = async (url: string, getSpecifyData: GetSpecifyData) => {
    // 1. 获取页面 html 信息
    const html = await this.getHtmlByAxios(url);
    // 2. 获取对应标签内容信息（可以适当处理输入内容格式）
    const data = await getSpecifyData(html);
    // 3. 内容写入文件
    this.writeFile(data);
  }
}

