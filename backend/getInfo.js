const ytdl = require('ytdl-core');
const convertS2HMS = require('./hepler');
const cors = require('cors');

const getVideoInfo = async (url) => {
  try {
    if (!ytdl.validateURL(url)) {
      throw new Error(`${url} is not a valid youtube url`);
    }

    const COOKIE =
      'GPS=1; YSC=WlQqt310qxU; VISITOR_INFO1_LIVE=fXjK__2OyyU; PREF=tz=Asia.Karachi';
    const info = await ytdl.getInfo(url, {
      requestOptions: {
        headers: {
          cookie: COOKIE,
        },
      },
    });

    const { title, description, video_url, lengthSeconds, thumbnails } =
      info.videoDetails;

    const videoThumbnail = thumbnails[thumbnails.length - 1].url;
    const { formats } = info;

    const videoFormats = [];
    for (const format of formats) {
      const { container, qualityLabel, itag } = format;
      if (container === 'webm' || qualityLabel === null) {
        continue;
      }
      videoFormats.push({ container, qualityLabel, itag });
    }

    const videoDuration = convertS2HMS(lengthSeconds);

    const videoMetaData = {
      title: title.trim(),
      description: description.trim().slice(0, 200),
      video_url,
      videoDuration,
      videoThumbnail,
      videoFormats,
    };

    return videoMetaData;
  } catch (error) {
    return error;
  }
};

module.exports = getVideoInfo;
