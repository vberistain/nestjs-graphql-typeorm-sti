import CustomError from './CustomError';

class EntityNotFoundError extends CustomError {
    constructor(message?: string) {
        super(message || 'Entity Not Found', 'ENTITY_NOT_FOUND', 'EntityNotFound');
    }
}

export { EntityNotFoundError };
