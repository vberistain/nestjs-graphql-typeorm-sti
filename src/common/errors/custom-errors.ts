import CustomError from './CustomError';

class EntityNotFoundError extends CustomError {
    constructor(message?: string) {
        super(message || 'Entity Not Found', 'ENTITY_NOT_FOUND', 'EntityNotFound');
    }
}

class RelatedEntityNotFoundError extends CustomError {
    constructor(message?: string) {
        super(message || 'Related Entity Not Found', 'RELATED_ENTITY_NOT_FOUND', 'RelatedEntityNotFound');
    }
}

class DuplicatedEntityError extends CustomError {
    constructor(message?: string) {
        super(message || 'Duplicated Entity', 'DUPLICATED_ENTITY', 'DuplicatedEntity');
    }
}

export { EntityNotFoundError, RelatedEntityNotFoundError, DuplicatedEntityError };
