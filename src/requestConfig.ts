import type { RequestOptions } from '@@/plugin-request/request';
import type { RequestConfig } from '@umijs/max';
import { message as notify, notification } from 'antd';

// 错误处理方案： 错误类型

/**
 * 自定义错误码
 */
enum ErrorCode {
  SUCCESS = 0,
  PARAMS_ERROR = 40000,
  NOT_LOGIN_ERROR = 40100,
  NO_AUTH_ERROR = 40101,
  NEED_PWD_ERROR = 40102,
  NOT_FOUND_ERROR = 40400,
  FORBIDDEN_ERROR = 40300,
  SYSTEM_ERROR = 50000,
  OPERATION_ERROR = 50001,
  API_REQUEST_ERROR = 50002,
}

/**
 * 错误码信息
 */
const errorCodeMessage: { [key in ErrorCode]: string } = {
  [ErrorCode.SUCCESS]: 'ok',
  [ErrorCode.PARAMS_ERROR]: '请求参数错误',
  [ErrorCode.NOT_LOGIN_ERROR]: '未登录',
  [ErrorCode.NO_AUTH_ERROR]: '无权限',
  [ErrorCode.NEED_PWD_ERROR]: '需要密码',
  [ErrorCode.NOT_FOUND_ERROR]: '请求数据不存在',
  [ErrorCode.FORBIDDEN_ERROR]: '禁止访问',
  [ErrorCode.SYSTEM_ERROR]: '系统内部异常',
  [ErrorCode.OPERATION_ERROR]: '操作失败',
  [ErrorCode.API_REQUEST_ERROR]: 'API 调用失败',
};

enum ErrorShowType {
  SILENT = 0,
  WARN_MESSAGE = 1,
  ERROR_MESSAGE = 2,
  NOTIFICATION = 3,
  REDIRECT = 9,
}

/**
 * 错误码信息
 */
const errorCodeShowType: { [key in ErrorCode]: ErrorShowType } = {
  [ErrorCode.SUCCESS]: ErrorShowType.SILENT,
  [ErrorCode.PARAMS_ERROR]: ErrorShowType.WARN_MESSAGE,
  [ErrorCode.NOT_LOGIN_ERROR]: ErrorShowType.WARN_MESSAGE,
  [ErrorCode.NO_AUTH_ERROR]: ErrorShowType.ERROR_MESSAGE,
  [ErrorCode.NEED_PWD_ERROR]: ErrorShowType.WARN_MESSAGE,
  [ErrorCode.NOT_FOUND_ERROR]: ErrorShowType.ERROR_MESSAGE,
  [ErrorCode.FORBIDDEN_ERROR]: ErrorShowType.ERROR_MESSAGE,
  [ErrorCode.SYSTEM_ERROR]: ErrorShowType.ERROR_MESSAGE,
  [ErrorCode.OPERATION_ERROR]: ErrorShowType.ERROR_MESSAGE,
  [ErrorCode.API_REQUEST_ERROR]: ErrorShowType.ERROR_MESSAGE,
};

// 与后端约定的响应数据格式
interface ResponseStructure {
  message: string;
  data: any;
  code: ErrorCode;
}

/**
 * 错误处理
 * pro 自带的错误处理， 可以在这里做自己的改动
 * @doc https://umijs.org/docs/max/request#配置
 */
export const requestConfig: RequestConfig = {
  // 错误处理： umi@3 的错误处理方案。
  errorConfig: {
    // 错误抛出
    errorThrower: (res) => {
      const { data, message, code } = res as unknown as ResponseStructure;
      console.log('errorThrower');
      if (code !== 0) {
        console.log('inner errorThrower');
        const error: any = new Error(message);
        error.name = 'BizError';
        error.info = { code, message, data };
        throw error; // 抛出自制的错误
      }
    },
    // 错误接收及处理
    errorHandler: (error: any, opts: any) => {
      console.log('errorHandler');
      if (opts?.skipErrorHandler) throw error;
      // 我们的 errorThrower 抛出的错误。
      console.log('inner errorHandler');
      if (error.name === 'BizError') {
        const errorInfo: ResponseStructure | undefined = error.info;
        if (errorInfo) {
          let { message, code } = errorInfo;
          message = message || errorCodeMessage[errorInfo.code];
          switch (errorCodeShowType[errorInfo.code]) {
            case ErrorShowType.SILENT:
              // do nothing
              break;
            case ErrorShowType.WARN_MESSAGE:
              notify.warning(message);
              break;
            case ErrorShowType.ERROR_MESSAGE:
              notify.error(message);
              break;
            case ErrorShowType.NOTIFICATION:
              notification.open({
                description: message,
                message: code,
              });
              break;
            case ErrorShowType.REDIRECT:
              // TODO: redirect
              break;
            default:
              notify.error(message);
          }
        }
      } else if (error.response) {
        // Axios 的错误
        // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
        notify.error(`Response status:${error.response.status}`);
      } else if (error.request) {
        // 请求已经成功发起，但没有收到响应
        // \`error.request\` 在浏览器中是 XMLHttpRequest 的实例，
        // 而在node.js中是 http.ClientRequest 的实例
        notify.error('None response! Please retry.');
      } else {
        // 发送请求时出了点问题
        notify.error('Request error, please retry.');
      }
    },
  },

  // 请求拦截器
  requestInterceptors: [
    (config: RequestOptions) => {
      // 拦截请求配置，进行个性化处理。
      const url = config?.url && '/api'.concat(config?.url);
      return { ...config, url };
    },
  ],

  // 响应拦截器
  responseInterceptors: [
    (response: any) => {
      const errorThrower = response.config.errorConfig.errorThrower;
      // 拦截响应数据，进行个性化处理
      const { data } = response as unknown as ResponseStructure;
      errorThrower(data);
      return response;
    },
  ],
};
