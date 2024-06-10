import ytdl from "ytdl-core";

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply(`*تحميل فيديوهات اليوتوب*\nمثال:\n${usedPrefix + command} https://www.youtube.com/watch?v=LrsNYeLqRAU&t=0`);
  conn.sendMessage(m.chat, { react: { text: '😄', key: m.key }})
  let obj = await ytmp3(text);
  let title = obj.meta.title;
  conn.sendFile(m.chat, obj.buffer, '', "", m, 0, {
    mimetype: "video/mp4",
    fileName: `${title}.mp4`,
    asDocument: true,
  });
};

handler.help = ['ytvdoc']
handler.tags = ['downloader']
handler.command = ['ytvdoc']
export default handler 

async function ytmp3(url) {
  try {
    const { videoDetails } = await ytdl.getInfo(url, {
      lang: "ar",
    });
    const stream = ytdl(url, {
      filter: "videoandaudio",
    });
    const chunks = [];
    stream.on("data", (chunk) => {
      chunks.push(chunk);
    });
    await new Promise((resolve, reject) => {
      stream.on("end", resolve);
      stream.on("error", reject);
    });
    const buffer = Buffer.concat(chunks);
    return {
      meta: {
        title: videoDetails.title,
        channel: videoDetails.author.name,
        seconds: videoDetails.lengthSeconds,
        description: videoDetails.description,
        image: videoDetails.thumbnails.slice(-1)[0].url,
      },
      buffer: buffer,
      size: buffer.length,
    };
  } catch (error) {
    throw error;
  }
}
