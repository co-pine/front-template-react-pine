// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 GET /test */
export async function virtualThreadTest(options?: { [key: string]: any }) {
  return request<string>('/test', {
    method: 'GET',
    ...(options || {}),
  });
}
