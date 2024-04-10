// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /user/mock/login */
export async function userLoginMock(
  body: API.UserLoginMockRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLoginUserVO>('/user/mock/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
