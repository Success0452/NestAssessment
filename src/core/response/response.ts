import { HttpStatus } from "@nestjs/common";

export type HttpResponse = {
  statusCode: number;
  message: string;
  data?: any;
};

export function createHttpResponse(
  statusCode: HttpStatus,
  message: string,
  data?: any,
): HttpResponse {
  return {
    statusCode,
    message,
    data,
  };
}
