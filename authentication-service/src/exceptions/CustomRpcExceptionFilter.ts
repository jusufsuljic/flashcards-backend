import { ArgumentsHost, Catch, RpcExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';

/**
 * A custom exception filter for handling RpcExceptions.
 * @implements {RpcExceptionFilter<RpcException>}
 * @param {RpcException} exception - The RpcException to be caught.
 * @param {ArgumentsHost} host - The host object containing the arguments of the current execution context.
 * @returns {Observable<any>} - An observable that throws the error obtained from the RpcException.
 */
@Catch(RpcException)
export class CustomRpcExceptionFilter implements RpcExceptionFilter<RpcException> {
  catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
    return throwError(() => exception.getError());
  }
}
