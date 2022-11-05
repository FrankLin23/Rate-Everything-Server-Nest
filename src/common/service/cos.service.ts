import { Injectable } from '@nestjs/common';

import COS from 'cos-nodejs-sdk-v5';

@Injectable()
export class CosService {
  private cos: COS;
  private urlPrefix: string;

  constructor() {
    this.cos = new COS({
      SecretId: process.env.COS_SECRET_ID,
      SecretKey: process.env.COS_SECRET_KEY,
    });

    this.urlPrefix =
      'https://re-avatar-1300859107.cos.ap-shanghai.myqcloud.com';
  }

  async uploadImage() {}
}
