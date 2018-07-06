const clientId = "817463d7871147c2af3854bb367ea350";
const uriRedirect = "http://localhost:3000/";
let accessToken = "";

const Spotify = {
  getAccessToken() {
    if(response.ok) {
      return(accessToken);
    }
      let isAccessToken = window.location.href.match(/access_token=([^&]*)/);
      let isExpiresIn = window.location.href.match(/expires_in=([^&]*)/);
    if(isAccessToken && isExpiresIn) {
      accessToken = isAccessToken[1];
      const expiresIn = Number(isExpiresIn[1]);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
    } else {
      spotifyUrl = `${spotifyUrl}?client_id=${clientId}&responseType=token&scope=playlist-modify-public&redirect_uri=${uriRedirect}`;
      window.location = spotifyUrl;
    }
  }

  search(searchTerm) {
    const searchTermURL = 'https://api.spotify.com/v1/search?type=track';
    const header = {
      headers: {Authorization: `Bearer ${accessToken}`}
    };
    return fetch(`${searchTermURL}&q=${searchTerm}`, header).then(response =>{
      return response.json();
    }).then(jsonResponse =>{
      if(!jsonResponse.tracks) {
        return [];
      } else {
        return jsonResponse.tracks.items.map(track =>{
          return [
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
          ];
        });
      };
    });
  }

  savePlaylist(playlistName, trackUris) {
    if(!playlistName && !trackUris) {
      return;
    }
    let accessToken = Spotify.getAccessToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    let userId = '';
    return fetch('https://api.spotify.com/v1/me', {headers: headers}).then(response =>{
      return response.json();
    }).then(jsonResponse =>{
      let userId = jsonResponse.id;
      return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({name: playlistName})
      }).then(response =>{
        return response.json();
      }).then(jsonResponse => {
        //makes playlist the set playlist id
        let playlist.id = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({uris: trackUris})
        })
      })
    })
  } else {
    return;
  }

}

export default Spotify;
