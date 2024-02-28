import { NextFunction, Request, Response } from 'express';
import multer, { diskStorage } from 'multer';
import { extension } from 'mime-types';
import { IMiddleware } from '../../index.js';
import { nanoid } from 'nanoid';

export class UploadFileMiddleware implements IMiddleware {
  private readonly mimetype = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
  };

  constructor(
    private uploadDirectory: string,
    private fieldName: string,
  ) { }

  public async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
    const storage = diskStorage({
      destination: this.uploadDirectory,
      filename: (_req, file, callback) => {
        const fileExtention = extension(file.mimetype);
        const filename = nanoid();
        callback(null, `${filename}.${fileExtention}`);
      }
    });

    const uploadSingleFileMiddleware = multer({
      limits: { fileSize: 500000 },
      storage,
      fileFilter: (_req, file, cb) => {
        const isValid = !!this.mimetype[file.mimetype as keyof typeof this.mimetype];
        if(!isValid) {
          return cb(new Error('Invalid mime type!'));
        }
        cb(null, isValid);
      }
    }).single(this.fieldName);

    uploadSingleFileMiddleware(req, res, next);
  }
}
