import { useEffect, useRef, useState, useCallback } from 'react';
import { fetchEventSource } from '@microsoft/fetch-event-source';

export interface SSEMessage {
  id: string;
  type: 'log' | 'error' | 'success' | 'info';
  message: string;
  timestamp: string;
  data?: any;
}

interface UseSSEOptions {
  onMessage?: (message: SSEMessage) => void;
  onError?: (error: Error) => void;
  onOpen?: () => void;
  onClose?: () => void;
  retryInterval?: number;
}

export function useSSE(url: string | null, options: UseSSEOptions = {}) {
  const [messages, setMessages] = useState<SSEMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const connect = useCallback(() => {
    if (!url) return;

    // Abort previous connection if exists
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    fetchEventSource(url, {
      signal: abortController.signal,
      
      async onopen(response) {
        setIsConnected(true);
        setError(null);
        options.onOpen?.();
      },

      onmessage(event) {
        try {
          const message: SSEMessage = JSON.parse(event.data);
          setMessages(prev => [...prev, message]);
          options.onMessage?.(message);
        } catch (err) {
          console.error('Failed to parse SSE message:', err);
        }
      },

      onerror(err) {
        setError(err as Error);
        setIsConnected(false);
        options.onError?.(err as Error);
        
        // Return false to stop retrying
        if (err.name === 'AbortError') {
          return false;
        }
      },

      onclose() {
        setIsConnected(false);
        options.onClose?.();
      },

      openWhenHidden: true,
      retryInterval: options.retryInterval || 3000,
    });
  }, [url, options]);

  const disconnect = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsConnected(false);
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  useEffect(() => {
    connect();
    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  return {
    messages,
    isConnected,
    error,
    clearMessages,
    reconnect: connect,
    disconnect,
  };
}