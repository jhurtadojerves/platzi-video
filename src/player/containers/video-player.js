import React, { Component } from 'react'
import VideoPlayerLayout from '../components/video-player-layout'
import Video from '../components/video'
import Title from '../components/title'
import PlayPause from '../components/play-pause'
import Timer from '../components/timer'
import Controls from '../components/video-player-controls'
import FormattedTime from '../../widgets/helpers/formattedTime'
import ProgressBar from '../components/progress-bar'
import Spinner from '../components/spinner'
import Volume from '../components/volume'
import FullScreen from '../components/full-screen'

class VideoPlayer extends Component {
  state = {
    pause: true,
    duration: 0,
    currentTime: 0,
    loading: false,
    volume: 1,
    lastValue: null
  }

  togglePlay = event => {
    this.setState({
      pause: !this.state.pause
    })
  }

  componentDidMount() {
    this.setState({
      pause: (!this.props.autoplay)
    })
  }

  handleLoadedMetadata = event => {
    this.video = event.target
    this.video.volume = this.state.volume
    this.setState({
      duration: this.video.duration
    })
  }

  handleTimeUpdate = event => {
    this.setState({
      currentTime: this.video.currentTime
    })
  }

  handleProgressChange = event => {
    this.video.currentTime = event.target.value
  }

  handleSeeking = event => {
    this.setState({
      loading: true
    })
  }

  handleSeeked = event => {
    this.setState({
      loading: false
    })
  }

  handleVolumeToggle = () => {
    const lastValue = this.video.volume
    this.setState ( { lastValue } )
    if ( this.video.volume !== 0 ) {
      this.video.volume = 0
      this.setState ( { volume: this.video.volume } )
    } else {
      this.video.volume = this.state.lastValue
      this.setState ( { volume: this.video.volume } )
    }
  }

  handleVolumeChange = event => {
    this.video.volume = event.target.value
    this.setState({ volume: this.video.volume })
  }

  handleFullScreenClick = event =>
  {
    if(document.webkitIsFullScreen){
      document.webkitExitFullscreen()
    } else if(document.mozFullScreen) {
      document.mozCancelFullScreen()
    } else{
      if ( this.player.webkitRequestFullscreen ) {
        this.player.webkitRequestFullscreen()
      } else if ( this.player.mozRequestFullScreen ) {
        this.player.mozRequestFullScreen()
      }
    }
  }

  setRef = element => {
    this.player = element
    console.log(this.player)
  }

  render() {
    return (
      <VideoPlayerLayout
        setRef={ this.setRef }
      >

        <Title
          title={ this.props.title }
        />

        <Controls>
          <PlayPause
            pause={ this.state.pause }
            handleClick={ this.togglePlay }
          />
          <Timer
            duration={ FormattedTime(this.state.duration) }
            currentTime={ FormattedTime(this.state.currentTime) }
          />
          <ProgressBar
            duration={ this.state.duration }
            value={ this.state.currentTime }
            handleProgressChange={ this.handleProgressChange }
          />
          <Volume
            handleVolumeChange={ this.handleVolumeChange }
            handleVolumeToggle={ this.handleVolumeToggle }
            volume={ this.state.volume }
          />

          <FullScreen
            handleFullScreenClick={ this.handleFullScreenClick }
          />

        </Controls>

        <Spinner
          active={ this.state.loading }
        />

        <Video
          autoplay={ this.props.autoplay }
          src={ this.props.src }
          pause={ this.state.pause }
          handleLoadedMetadata={ this.handleLoadedMetadata }
          handleTimeUpdate={ this.handleTimeUpdate }
          handleSeeking={ this.handleSeeking }
          handleSeeked={ this.handleSeeked }
        />
      </VideoPlayerLayout>
    )
  }
}

export default VideoPlayer