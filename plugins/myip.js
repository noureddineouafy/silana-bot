import axios from 'axios';

const handler = async (m, { conn }) => {
  try {
    const { data } = await axios.get('https://api.ipify.org');
    conn.reply(m.chat, `BOT IP  ${data}`, m);
  } catch (e) {
    conn.reply(m.chat, 'Terjadi kesalahan saat memproses permintaan.', m);
    console.log(e);
  }
};

handler.help = ['myip'];
handler.tags = ['owner'];
handler.command = /^myip$/i;
handler.owner = true
export default handler;
