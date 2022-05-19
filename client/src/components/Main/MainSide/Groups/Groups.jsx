import React, { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getChannelsAction,
  removeChannelAction,
  updateChannelAction
} from "../../../../redux/Channels/ChannelsAction";
import {
  getChannels,
  addChannel,
  removeChannel,
  updateChannel
} from "../../../../services";
import "./groups.css";

const Groups = ({ title }) => {
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels);
  const [showAdd, setShowAdd] = useState(false);
  const [showUpdatedLabel, setShowUpdatedLabel] = useState('');
  const [showActions, setShowActions] = useState("");
  const [channelValue, setChannelValue] = useState("");
  const [updatedData, setUpdatedData] = useState("");

  const onAddChannel = () => {
    addChannel(channelValue)
      .then((res) => {
        dispatch(getChannelsAction(res.data.data));
        setShowAdd(false);
        setChannelValue("");
      }).catch((err) => console.log("ERR", err));
  };

  const onRemoveChannel = (id) => {
    removeChannel(id)
      .then((res) => dispatch(removeChannelAction(res.data)))
      .catch((err) => console.log("err", err));
  };

  const onUpdateChannel = (id) => {
    setShowUpdatedLabel('')
    if (updatedData.length > 0) {
      updateChannel(id, updatedData)
        .then((res) => dispatch(updateChannelAction(res.data, updatedData)))
        .catch((err) => console.log("err", err));
    }
  };

  useLayoutEffect(() => {
    getChannels()
      .then((res) => dispatch(getChannelsAction(res.data)))
      .catch((err) => console.log("ERR", err));
  }, [dispatch]);

  return (
    <div className="group">
      <div className="group-container">
        <h5>{title}</h5>
        <button className="add-button" onClick={() => setShowAdd(!showAdd)}>
          +
        </button>
      </div>
      <div
        style={{ display: showAdd ? "flex" : "none" }}
        className="channel-add-action"
      >
        <input
          placeholder="Channel Name"
          onChange={(e) => setChannelValue(e.target.value)}
        />
        <p onClick={onAddChannel} className="channel-add-btn">
          +
        </p>
      </div>
      {channels.map((channel) => (
        <ul key={channel._id} className="sub-group-list">
          <li
            onMouseOver={() => setShowActions(channel._id)}
            onMouseLeave={() => setShowActions("")}
            className="sub-group"
          >
            {showUpdatedLabel ? (
              <>
                <input defaultValue={channel.channels} onChange={(e) => {
                  if (channel.channels !== e.target.value) setUpdatedData(e.target.value)
                }} />
                <p onClick={() => onUpdateChannel(channel._id)}>&#10003;</p>
              </>
            ) : (
              <>
                <p>{channel.channels}</p>
                <div
                  style={{
                    display: showActions === channel._id ? "flex" : "none",
                  }}
                  className="sub-group-actions"
                >
                  <p onClick={() => setShowUpdatedLabel(channel._id)}>
                    &#9998;
                  </p>
                  <p onClick={() => onRemoveChannel(channel._id)}>&#10006;</p>
                </div>
              </>
            )}
          </li>
        </ul>
      ))}
    </div>
  );
};

export default Groups;
