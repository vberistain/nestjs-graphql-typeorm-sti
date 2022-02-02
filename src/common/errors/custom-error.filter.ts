import { Catch, ArgumentsHost } from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-express';
import CustomError from './CustomError';

@Catch(CustomError)
export class CustomErrorFilter implements GqlExceptionFilter {
    catch(error: CustomError, host: ArgumentsHost) {
        const gqlHost = GqlArgumentsHost.create(host);
        return new ApolloError(error.message, error.code);
    }
}
