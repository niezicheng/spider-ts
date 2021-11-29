import superagent from 'superagent';
import fs from 'fs';
import { SITE_URL, RES_FILE_PATH } from './constant';
import DataInfo from './data-info';

const dataInfo = DataInfo.getInstance();

class Spider {
  constructor () {
    this.getHtmlContent();
  }

  // 获取页面 html
  getHtml = async () => {
    const html = await (superagent.get(SITE_URL) as any);

    return html.text;
  }

  // 存入数据
  writeFile = (content: string) => {
    fs.writeFileSync(RES_FILE_PATH, content);
  }

  // 获取
  getHtmlContent = async () => {
    const html = await this.getHtml();
    const data = dataInfo.getDataInfo(html);
    this.writeFile(data);
  }
}

new Spider();