export const errcode = {
  accessDeny: { code: 403, msg: 'access deny error' },
  mongo: (code: number, msg: string) => ({ code, msg }),
  wrongToken: { code: 998, msg: 'wrong token error' },
  unknown: { code: 999, msg: 'unknown error occured' },
  param: {
    wrong: { code: 101, msg: 'wrong body or param data.' },
    objectid: { code: 102, msg: 'invalid objectid error' },
  },
  user: {
    notfound: { code: 1001, msg: 'not found user error' },
    wrongPassword: { code: 1002, msg: 'wrong password error' },
    notAdmin: { code: 1003, msg: 'user role is not admin error' },
    alreadyExists: { code: 1004, msg: 'already exists user error' },
    passwordMinLen: { code: 1005, msg: 'password min length is 8 error' },
    notSuppertedSSO: { code: 1006, msg: 'not supported sso error' },
    kakaoUnauthorized: { code: 1007, msg: 'kakao unauthorized error'},
  },
  card: {
    notfound: { code: 2001, msg: 'not found card error' },
  },
  todo: {
    notfound: { code: 3001, msg: 'not found todo error' },
  },
  comment: {
    notfound: { code: 4001, msg: 'not found comment error' },
  },
  file: {
    notfound: { code: 5001, msg: 'not found file error' },
  },
};

export const generate = (data: any) => {
  const packet = { success: true, data };
  return packet;
};

export const error = (code: number, msg: string) => {
  const packet = { success: false, code, message: msg };
  return packet;
};
