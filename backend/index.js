const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const ytdl = require('ytdl-core');

const getVideInfo = require('./getInfo');

io.on('connection', (socket) => {
  console.log('connection successfull');
  socket.on('connection:ready', async (message) => {
    const videoMetaData = await getVideInfo(message);
    socket.emit('videoMetaData', videoMetaData);
  });
});

app.get('/download', (req, res) => {
  const videoURL = req.query.videoURL;
  const itag = req.query.itag;
  try {
    if (!itag || !videoURL) throw new Error('something went wrong');

    res.header('Content-Disposition', 'attachment; filename="video.mp4"');
    ytdl(videoURL, {
      filter: (format) => {
        return format.itag == itag;
      },
    }).pipe(res);
  } catch (error) {
    console.log(error.message);
  }
});

server.listen(3000, (_) => console.log('server is running on the port:3000'));
