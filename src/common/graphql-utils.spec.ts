import { mapToRelations } from './graphql-utils';

describe('Graphql-utils', () => {
    describe('mapToRelations', () => {
        it('should get the right relations', async () => {
            const map = { movie: { id: {}, playback: { id: {}, position: {} } } };
            expect(mapToRelations(map.movie)).toEqual(['playback']);
        });
        it('should get the right relations with several levels', async () => {
            const map = {
                bundle: {
                    id: {},
                    contents: {
                        id: {},
                        type: {},
                        inContents: {
                            id: {},
                            type: {}
                        },
                        contents: {
                            id: {},
                            type: {}
                        }
                    }
                }
            };
            expect(mapToRelations(map.bundle)).toEqual(['contents', 'contents.inContents', 'contents.contents']);
        });
    });
});
