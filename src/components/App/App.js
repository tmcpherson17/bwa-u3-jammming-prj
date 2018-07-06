import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify'

class App extends Component {
  constructor(props) {
    super(props);
    this.setState = {
    //search results should contain: name, artist, album and id properties
      searchResults: [],
      playlistName: '',
      playlistTracks: [],
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (!tracks.find(playlistTrack => playlistTrack.id === track.id)) {
      //concat allows you to add strings together w/o mutating them
      let addTracks = tracks.concat(track);
      this.setState({playlistTracks: addTracks});
    }
  }

  removeTrack(track) {
    let removeTrack = this.state.playlistTracks.filter(playlistTrack => track.id != playlistTrack.id);
    this.setState({playlistTracks: removeTrack});
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  savePlaylist() {
    const trackUris = this.state.playlistTracks.map(track =>{
      return track.uri
    });
    Spotify.savePlaylist(this.state.playlistName, trackUris);
    this.setState({
      playlistName: 'New Playlist',
      playlistTracks: []
    });
  }

  search(searchTerm) {
    Spotify.search(searchTerm).then(spotifySearchResult => {
      this.setState({searchResults: spotifySearchResult});
    })
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div className="App">
            <SearchBar onSearch={this.search} />
            <div className="App-playlist">
              <SearchResults searchResults={this.state.searchResults} />
              <Playlist
                playlistTracks={this.state.playlistTracks}
                playlistName={this.state.playlistName}
                onRemove={this.removeTrack}
                onNameChange={this.state.updatePlaylistName}
                onSave={this.state.savePlaylist} />
            </div>
          </div>
        </div>
    );
  }
}

export default App;
