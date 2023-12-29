import React, { Component } from 'react'
import Player from 'aliplayer-react';

const config = {
    source: "http://110.40.204.35:7002/live/movie.m3u8",
    width: "100%",
    height: "500px",
    autoplay: true,
    isLive: true,
    rePlay: false,
    playsinline: true,
    preload: true,
    controlBarVisibility: "hover",
    useH5Prism: true,
    components: [
        {
            name: "RateComponent",
            type: Player.components.RateComponent,
        }
    ]
};

export default class Test1 extends Component {
    state = {
        instance:null
    }
    render() {
        return (
            <div>
                <Player
                config={config}
                onGetInstance={instance => this.setState({ instance })}
                // Optional: custom cdn url
                // sourceUrl={'https://g.alicdn.com/de/prismplayer/2.8.2/aliplayer-min.js'}
            />
                <p>qweqw</p>
            </div>
        ) 
    }
}
 