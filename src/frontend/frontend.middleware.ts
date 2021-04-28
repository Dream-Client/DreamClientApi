import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as path from 'path';
import { AppService } from '../app.service';
import { FrontendService } from './frontend.service';
@Injectable()
export class FrontendMiddleware implements NestMiddleware {
  constructor(private readonly frontendService: FrontendService) {}
  async use(req: Request, res: Response, next: () => void) {
    if (/[^\\/]+\.[^\\/]+$/.test(req.path)) {
      const file = this.frontendService.getAssetPath(req.path);
      res.sendFile(file, (err) => {
        if (err) {
          res.status(500).end();
        }
      });
    } else {
      return next();
    }
  }
}
