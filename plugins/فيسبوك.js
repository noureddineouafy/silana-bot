import fg from 'api-dylux';

const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    throw `*✳️ الـرجـاء ارسال رابـــط*\n\n📌 *مـــثال* :\n*${usedPrefix + command}* https://www.facebook.com/reel/1260840321299092`;
  }

  const urlRegex = /^(?:https?:\/\/)?(?:www\.)?(?:facebook\.com|fb\.watch)\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i;
  if (!urlRegex.test(args[0])) {
    throw '*⚠️ اعــطيـني رابــط صـالــح*';
  }


  try {
    const result = await fg.fbdl(args[0]);
    const tex = `
*❒⊱──┇ بــوت ┇──⊰❒*

↳ *عـنوان الــفيـديو:* ${result.title}

*❒⊱───┇ ♬ ┇───⊰❒*`;

    const response = await fetch(result.videoUrl);
    const arrayBuffer = await response.arrayBuffer();
    const videoBuffer = Buffer.from(arrayBuffer);

    conn.sendFile(m.chat, videoBuffer, 'fb.mp4', tex, m);
    m.react(done);
  } catch (error) {
    console.log(error);
    m.reply('*❗ جـرب لاحــقا ❗*');
  }
};

handler.help = ['facebook <url>'];
handler.tags = ['dl'];
handler.command = /^((فيسبوك|fb)(downloder|dl)?)$/i;
handler.diamond = true;

export default handler;
