// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /backup/add */
export async function addBackup(body: API.BackupAddRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseLong>('/backup/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /backup/delete */
export async function deleteBackup(body: API.DeleteRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean>('/backup/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /backup/edit */
export async function editBackup(body: API.BackupEditRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean>('/backup/edit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /backup/get */
export async function getBackupById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getBackupByIdParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBackup>('/backup/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /backup/get/vo */
export async function getBackupVoById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getBackupVOByIdParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBackupVO>('/backup/get/vo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /backup/list/page */
export async function listBackupByPage(
  body: API.BackupQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageBackup>('/backup/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /backup/list/page/vo */
export async function listBackupVoByPage(
  body: API.BackupQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageBackupVO>('/backup/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /backup/my/list/page/vo */
export async function listMyBackupVoByPage(
  body: API.BackupQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageBackupVO>('/backup/my/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /backup/update */
export async function updateBackup(
  body: API.BackupUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/backup/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
