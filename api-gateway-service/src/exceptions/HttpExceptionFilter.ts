import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';

/**
 * Global exception filter class that implements the ExceptionFilter interface.
 * Catches any exceptions thrown during the execution of a request and handles them.
 * @class GlobalExceptionFilter
 * @implements {ExceptionFilter}
 */
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): void {
    console.log(exception);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.status ?? HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      message: exception.message,
    });
  }
}
