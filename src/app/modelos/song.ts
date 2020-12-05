import { Album } from './album';

export class Song {
    // tslint:disable-next-line: variable-name
    _id: string;
    number: number;
    name: string;
    duration: string;
    genre: string;
    numberTimeListened: number;
    file: string;
    album: Album;
}
