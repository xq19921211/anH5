interface base {
  state: number;
  status: number;
  info: string;
}
interface AxiosResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  config: any;
  request?: any;
}

interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {}

/**
 * 分页数据
 */
interface Pages {
  totalRow: string;
  pageNumber: number;
  lastPage: boolean;
  firstPage: boolean;
  totalPage: number;
  pageSize: number;
}
