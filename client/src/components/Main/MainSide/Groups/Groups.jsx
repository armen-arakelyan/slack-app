import React, { useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getChannelsAction } from '../../../../redux/getChannels/getChannelsAction'
import { getChannels, addChannel } from '../../../../services'
import './groups.css'

const Groups = ({ title }) => {
  const dispatch = useDispatch()
  const channels = useSelector(state => state.channels)
  const [showAdd, setShowAdd] = useState(false)
  const [channelValue, setChannelValue] = useState('')
  const onAddChannel = () => {
    addChannel(channelValue)
       .then(res => dispatch(getChannelsAction(res.data.data)))
       .catch((err) => console.log('ERR', err))
  }

  useLayoutEffect(() => {
    getChannels()
       .then(res => dispatch(getChannelsAction(res.data)))
       .catch((err) => console.log('ERR', err))
  }, [])

  return (
    <div className="group">
      <div className='group-container'>
        <h5>{title}</h5>
        <button className="add-button" onClick={() => setShowAdd(!showAdd)}>+</button>
      </div>
      <div style={{ display: showAdd ? 'flex' : 'none' }} className='channel-add-action'>
        <input onChange={(e) => setChannelValue(e.target.value)} />
        <button onClick={onAddChannel} className='form-submit'>+</button>
      </div>
      {channels.map((channel) => <ul key={channel._id} className="sub-group-list">
        <li className="sub-group">{channel.channels}</li>
      </ul>)}
    </div>
  )
}

export default Groups