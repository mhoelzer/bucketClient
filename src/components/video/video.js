import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './search-bar';
import VideoDetail from './video-detail';

const API_KEY = 'AIzaSyCmYzOCxcqS9WfJ_8R9koa6SPd5Qvlk6_I'

class Video extends Component{
	constructor(props){
		super(props);
		this.state = {
			videos: [],
			selectedVideo: null
		};
		this.videoSearch('Evanescence - Bring Me To Life (Animal Cover)');
	}
	videoSearch(term){
		YTSearch({key: API_KEY, term: term}, (videos) => {
			this.setState({
				videos: videos,
				selectedVideo: videos[0]
			});
		});
	}
	render(){
		const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300);
		return(
			<div>
				<SearchBar onSearchTermChange={videoSearch} />
				<VideoDetail video={this.state.selectedVideo} />
			</div>
		);
	}
}
export default Video;