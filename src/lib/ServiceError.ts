import { errcode } from './packet';

const unknownError = errcode.unknown;

export default class ServiceError extends Error {
  code: number;
  msg: string;
  status: number;
  orgError: any;

  constructor(errcode: any, status?: number, orgError?: any) {
    let message = unknownError.msg;
    if (errcode?.msg) {
      message = errcode.msg;
    } else if (orgError?.message) {
      message = orgError.message;
    }

    super(message);
    this.name = 'ServiceError';
    if (errcode?.code) {
      this.code = errcode.code;
    } else {
      this.code = unknownError.code;
    }
    this.msg = message;
    this.status = errcode?.status || status || 200;
    this.orgError = orgError;
  }

  toErrorJson() {
    if (this.orgError) {
      console.log('origianl Error: ', this.orgError);
    }
    return {
      success: false,
      code: this.code,
      message: this.msg,
    };
  }
}
