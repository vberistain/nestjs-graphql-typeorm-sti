import { GraphQLError, GraphQLFormattedError } from 'graphql';

export default function formatGraphQLError(error: GraphQLError): GraphQLFormattedError {
    return {
        message: error.message,
        path: error.path,
        extensions: {
            code: error.extensions?.code,
            errorCode: error.extensions?.errorCode
        }
    };
}
