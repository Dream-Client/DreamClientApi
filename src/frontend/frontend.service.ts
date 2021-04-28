import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FrontendService {
  constructor(private configService: ConfigService) {}

  public async getApp() {
    const basePath = this.configService.get<string>('CLIENT_BUILD_PATH');
    const filePath = path.resolve(path.join(basePath, 'index.html'));
    return new Promise((resolve, reject) => {
      fs.readFile(
        filePath,
        'utf8',
        (err: NodeJS.ErrnoException, data: string) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        }
      );
    });
  }

  getAssetPath = (url: any) => {
    const basePath = this.configService.get('CLIENT_BUILD_PATH');
    return path.join(basePath, url);
  };
}
