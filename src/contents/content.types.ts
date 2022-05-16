import { createUnionType } from '@nestjs/graphql';
import { Movie } from './movies/movie.entity';
import { Playlist } from './playlists/playlist.entity';
import { Bundle } from './bundles/bundle.entity';
import { ContentType } from './content.interface';

export const ContentUnion = createUnionType({
    name: 'ContentUnion',
    // types: () => [Movie, Playlist, Bundle] as const,
    types: () => [Movie, Playlist, Bundle],
    resolveType(content: any) {
        if (content.type === ContentType.movie) {
            return Movie;
        }
        if (content.type === ContentType.playlist) {
            return Playlist;
        }
        if (content.type === ContentType.bundle) {
            return Bundle;
        }
        return null;
    }
});

export const ContentContainerUnion = createUnionType({
    name: 'ContentContainerUnion',
    // types: () => [Playlist, Bundle] as const,
    types: () => [Playlist, Bundle],
    resolveType(content: any) {
        if (content.type === ContentType.playlist) {
            return Playlist;
        }
        if (content.type === ContentType.bundle) {
            return Bundle;
        }
        return null;
    }
});

export const ContentContainedUnion = createUnionType({
    name: 'ContentContainedUnion',
    // types: () => [Movie, Playlist] as const,
    types: () => [Movie, Playlist],
    resolveType(content: any) {
        if (content.type === ContentType.playlist) {
            return Playlist;
        }
        if (content.type === ContentType.movie) {
            return Movie;
        }
        return null;
    }
});
