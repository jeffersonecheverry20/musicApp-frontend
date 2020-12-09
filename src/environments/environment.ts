// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // Heroku
  loginUser: 'https://app-music-university.herokuapp.com/api/login',
  loginArtist: 'https://app-music-university.herokuapp.com/api/login-artist',
  registerUser: 'https://app-music-university.herokuapp.com/api/register',
  registerArtist: 'https://app-music-university.herokuapp.com/api/register-artist',
  updateUser: 'https://app-music-university.herokuapp.com/api/update-user/',
  // Local
  loginUserLocal: 'http://localhost:3000/api/login',
  loginArtistLocal: 'http://localhost:3000/api/login-artist',
  registerUserLocal: 'http://localhost:3000/api/register',
  registerArtistLocal: 'http://localhost:3000/api/register-artist',
  getUserLocal: 'http://localhost:3000/api/user/',
  uploadImageUserLocal: 'http://localhost:3000/api/upload-image/',
  getImageUserLocal: 'http://localhost:3000/api/get-image/',
  updateUserLocal: 'http://localhost:3000/api/update-user/',
  getAllArtists: 'http://localhost:3000/api/artists',
  getAllAlbums: 'http://localhost:3000/api/albums/',
  saveAlbum: 'http://localhost:3000/api/createAlbum',
  uploadImageAlbumLocal: 'http://localhost:3000/api/upload-image-album/',
  getImageAlbumLocal: 'http://localhost:3000/api/get-image-album/',
  saveSongLocal: 'http://localhost:3000/api/createSong',
  uploadAudioLocal: 'http://localhost:3000/api/upload-file-song/',
  getSongLocal: 'http://localhost:3000/api/song/',
  getSongAlbumLocal: 'http://localhost:3000/api/songs/',
  getAudiloLocal: 'http://localhost:3000/api/get-file-song/',
  updateListenedSongLocal: 'http://localhost:3000/api/updateListened/',
  getArtist: 'http://localhost:3000/api/artist/',
  getImageArtistLocal: 'http://localhost:3000/api/get-image/',
  updateArtistLocal: 'http://localhost:3000/api/update-artist/',
  uploadImageArtisLocal: 'http://localhost:3000/api/upload-artist-image/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
