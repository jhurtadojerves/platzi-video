import React from 'react'
import Media from './media'

import './playlist.css'

const Playlist = (props) => {
  return (
    <div className="Playlist">
      {
        props.playlist.map((item) => <Media {...item} key={item.id} openModal={ props.handleOpenModal }/>)
      }
    </div>

  )
}

export default Playlist