import { Middleware } from 'redux';
import { RootState } from '../../utils/types';

// Интерфейс для конфигурации WebSocket соединения
export interface WsConfig {
  wsInit: string;
  onOpen: string;
  onError: string;
  onClose: string;
  onMessage: string;
}

export interface WsConnectionStartPayload {
  url: string;
}

/**
 * Универсальный WebSocket middleware
 */
export const socketMiddleware = (wsConfig: WsConfig): Middleware<{}, RootState> => {
  return (store) => {
    let socket: WebSocket | null = null;

    return (next) => (action: unknown) => {
      const { dispatch } = store;
      const wsAction = action as { type: string; payload?: any };
      const { type, payload } = wsAction;

      if (type === wsConfig.wsInit) {
        if (socket) {
          socket.onopen = null;
          socket.onerror = null;
          socket.onclose = null;
          socket.onmessage = null;
          try {
            socket.close();
          } catch {
            // error
          }
          socket = null;
        }

        const connectionPayload = payload as WsConnectionStartPayload | string;
        const wsUrl = typeof connectionPayload === 'string' 
          ? connectionPayload 
          : connectionPayload?.url;

        if (!wsUrl) {
          dispatch({
            type: wsConfig.onError,
            payload: 'URL WebSocket not found',
          } as any);
          return next(action);
        }

        socket = new WebSocket(wsUrl);

        socket.onopen = () => {
          dispatch({
            type: wsConfig.onOpen,
          } as any);
        };

        socket.onerror = () => {
          dispatch({
            type: wsConfig.onError,
            payload: 'Connection error WebSocket',
          } as any);
        };

        socket.onclose = () => {
          dispatch({
            type: wsConfig.onClose,
          } as any);
        };

        socket.onmessage = (event) => {
          const { data } = event;
          try {
            const parsedData = JSON.parse(data);
            dispatch({
              type: wsConfig.onMessage,
              payload: parsedData,
            } as any);
          } catch (error) {
            console.error('[WebSocket] Parsing error:', error, data);
            dispatch({
              type: wsConfig.onError,
              payload: 'Parsing error WebSocket',
            } as any);
          }
        };
      }

      if (socket && type === wsConfig.onClose) {
        socket.onopen = null;
        socket.onerror = null;
        socket.onclose = null;
        socket.onmessage = null;

        try {
          socket.close();
        } catch {
          // error
        }
        socket = null;
      }

      return next(action);
    };
  };
};
