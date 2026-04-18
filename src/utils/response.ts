import { ApiResponse } from './types';

export function checkResponse(res: Response): Promise<ApiResponse<any>> {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error ${res.status}`);
}

export function checkSuccess<T>(res: ApiResponse<T>): Promise<ApiResponse<T>> {
  if (res && res.success) {
    return Promise.resolve(res);
  }
  const errorMessage = res?.message || `Message: ${JSON.stringify(res)}`;
  const error = new Error(errorMessage);
  (error as any).response = res;
  return Promise.reject(error);
}
