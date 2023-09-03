import lxRequest from '../index';

import { IDataType } from '../types';

enum TestAPI {
  test = '/'
}

export function accountLoginRequest(account: any) {
  return lxRequest.post<IDataType>({
    url: TestAPI.test,
    data: account
  });
}
