export const generateChannelName = (
  channels,
  key = 1,
  exclude = -1,
  defName = "beeweb"
) => {
  let name = defName;
  if (key > 1) name += " " + key;
  const channelWithSameName = channels.find(
    (channel, key) => name === channel.title && key !== exclude
  );
  if (typeof channelWithSameName !== "undefined") {
    return generateChannelName(channels, key + 1, exclude, defName);
  } else {
    return name;
  }
};
