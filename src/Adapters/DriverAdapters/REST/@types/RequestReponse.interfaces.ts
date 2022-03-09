interface HttpRequest {
  body: any;
  headers: {
    authorization?: string;
  };
}

interface HttpSuccessResponse {
  success: true;
  status: 200;
  data: any;
}

interface HttpFailureResponse {
  success: false;
  status: Omit<typeof STATUS_CODES[keyof typeof STATUS_CODES], 200>;
  error: any;
}

type HttpResponse = HttpFailureResponse | HttpSuccessResponse;

export type ControllerFunction = (args: HttpRequest) => Promise<HttpResponse>;

export const STATUS_CODES = {
  SUCCESS: 200,
  SERVER_ERROR: 500,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  NOT_AUTHORIZED: 401,
} as const;
