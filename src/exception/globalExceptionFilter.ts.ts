import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        let status = HttpStatus.INTERNAL_SERVER_ERROR;

        switch (exception.constructor) {
            case HttpException:
                status = (exception as HttpException).getStatus();
                break;

            case QueryFailedError: // this is a TypeOrm error
                status = HttpStatus.UNPROCESSABLE_ENTITY;
                break;

            default:
                status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        response.status(status).json({
            statusCode: status,
            message: (exception as any).message,
            timestamp: new Date().toISOString(),
            path: request.url,
        });
    }
}
