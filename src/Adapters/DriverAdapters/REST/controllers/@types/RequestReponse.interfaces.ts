export interface HttpRequest {
  body: Object;
  headers: {
    authorization: string;
  };
}

export const STATUS_CODES = {
  SUCCESS: 200,
  SERVER_ERROR: 500,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  NOT_AUTHORIZED: 401,
} as const;

export interface HttpResponse {
  status: typeof STATUS_CODES[keyof typeof STATUS_CODES];
}
