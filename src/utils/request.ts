import { BASE_URL } from './constants';
import { checkResponse, checkSuccess } from './response';
import { ApiResponse } from './types';

export function request<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
  return fetch(`${BASE_URL}${endpoint}`, options)
    .then(checkResponse)
    .then(checkSuccess);
}
