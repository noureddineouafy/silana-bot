import axios from 'axios';

const handler = async (m, { text, usedPrefix, command }) => {
  if (!text) throw `مثال : \n\n ${usedPrefix + command} الرباط`;
  let res = await jadwalsholat(text);
  conn.reply(m.chat,
    `جدول الصلاة في ${text}

    الفجر : ${res.subuh}
    الظهر : ${res.dhuhur}
    العصر : ${res.ashar}
    المغرب : ${res.maghrib}
    العشاء : ${res.isya}\n\n\n\n\n\n\n\n instagram :@noureddine_ouafy`, m);
}

handler.help = ['salaty'];
handler.tags = ['infobot','tools'];
handler.command = /^(salaty)$/i;

export default handler;

async function jadwalsholat(kota) {
  try {
    let { data } = await axios.get(`https://api.aladhan.com/v1/timingsByCity?city=${kota}&country=Morocco&method=8`);
    let response = {
      subuh: data.data.timings.Fajr,
      dhuhur: data.data.timings.Dhuhr,
      ashar: data.data.timings.Asr,
      maghrib: data.data.timings.Maghrib,
      isya: data.data.timings.Isha
    };
    return response;
  } catch (e) {
    return e;
  }
}
