import { Artist } from './artists';

export class Album {
    // tslint:disable-next-line: variable-name
    _id: string;
    title: string;
    year: string;
    description: string;
    genre: string;
    image: string;
    artist: Artist;
}
