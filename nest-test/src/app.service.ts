import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';
import * as iconv from 'iconv-lite';

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}

  async getIpInfo(ip: string): Promise<any> {
    const url = `https://whois.pconline.com.cn/ipJson.jsp?json=true&ip=${ip}`;

    return this.httpService.get(url, { responseType: 'arraybuffer' }).pipe(
      map(response => {
        const { addr = '' } = JSON.parse(iconv.decode(Buffer.from(response.data), 'gbk'));

        const res = {
          code: 0,
          data: {
            addr
          },
          msg: 'ok'
        };

        return res
      })
    );
  }

  async getHello(): Promise<string> {
    const results = {
      'name': 'jack',
      'age': 18,
      'sex': 1
    }

    return JSON.stringify(results, null, 2)
    // return 'Hello World!';
  }
}
