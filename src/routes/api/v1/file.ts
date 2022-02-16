'use strict';

import { Router, Response, NextFunction } from 'express';
import multer from 'multer';

import ServiceError from '../../../lib/ServiceError';
import { errcode, generate, } from '../../../lib/packet';
import { readFileStream } from '../../../lib/utils';

import { uploadObjects, changeObject, getFileById, removeFile, } from '../../../controller/file';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.any(), createAndUploadFile);
router.put('/:fileid', upload.single('file'), updateAndUploadFile);
router.get('/:fileid', getFileOne);
router.get('/:fileid/object', getFileObject);
router.delete('/:fileid', removeFileOne);


async function createAndUploadFile(req: any, res: Response, next: NextFunction) {
  try {
    const files = req.files;
    console.log(files);
    const category = req.body.category;
    if (!files) {
      throw new ServiceError(errcode.param.wrong);
    }
    const uploadFiles = await uploadObjects(files, category);
    res.json(generate(uploadFiles));
  } catch (err) {
    next(err);
  }
}

async function getFileOne(req: any, res: Response, next: NextFunction) {
  try {
    const file = await getFileById(req.params.fileid);
    res.json(generate(file));
  } catch (err) {
    next(err);
  }
}

async function getFileObject(req: any, res: Response, next: NextFunction) {
  try {
    const file = await getFileById(req.params.fileid);
    res.setHeader('Content-Type', file.mimetype);
    readFileStream(file._path).on('data', (data) => {
      res.write(data);
    }).on('end', () => {
			res.end();
		}).on('error', (err) => {
			res.end();
    });
  } catch (err) {
    next(err);
  }
}

async function updateAndUploadFile(req: any, res: Response, next: NextFunction) {
  try {
    const file = req.file;
    const fileid = req.params.fileid;
    if (!file) {
      throw new ServiceError(errcode.param.wrong);
    }
    const changedFile = await changeObject(fileid, file);
    res.json(generate(changedFile));
  } catch (err) {
    next(err);
  }
}

async function removeFileOne(req: any, res: Response, next: NextFunction) {
  try {
    const file = await removeFile(req.params.fileid);
    res.json(generate(file));
  } catch (err) {
    next(err);
  }
}

export default router;
