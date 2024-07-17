import fetch from 'node-fetch';

let points = 50;
let maxPlayers;

let handler = async (m, { conn, command, text }) => {
    let id = m.chat;
    conn.tekateki1 = conn.tekateki1 ? conn.tekateki1 : {};


    if (command === "مسابقه") {
        if (id in conn.tekateki1) {
            return conn.reply(m.chat, 'المسابقه بدأت بالفعل', conn.tekateki1[id][0]);
        } else if (!text) {
            return conn.reply(m.chat, 'ادخل عدد اللاعبين', m);
        } else if (isNaN(text)) {
            return conn.reply(m.chat, 'يرجى إدخال رقم لعدد اللاعبين', m);
        } else if (text > 8 || text < 5) {
            return conn.reply(m.chat, 'الحد الأقصى للاعبين ثمانية, والحد الأدنى خمسه', m);
        } else {
            maxPlayers = text;
        }
        conn.tekateki1[id] = [
            await conn.reply(m.chat, '1 - جاوب علي السوأل بسرعه\n2 - جمع  50 نقطه\n3 - اتبع التعليمات', m), [], [], 0
        ];

        conn.reply(m.chat, `🎡| المسابقة بدأت، يمكن لـ ${maxPlayers} لاعبين الانضمام. اكتب " .انضمام" للانضمام `, m);
        throw false;
    } else if (command === "انضمام") {
        if (!(id in conn.tekateki1)) {
            throw conn.reply(m.chat, 'لا يوجد مسابقة قائمة حالياً!', m);
        } 

        if (conn.tekateki1[id][2].length >= maxPlayers) {
            throw conn.reply(m.chat, 'اكتمل العدد', m);;
        }

        if (conn.tekateki1[id][2].findIndex(player => player.id === m.sender) !== -1) {
            throw conn.reply(m.chat, 'أنت مسجل بالفعل', m);
        }

        conn.tekateki1[id][2].push({ id: m.sender, points: 0 });
        conn.reply(m.chat, 'تم التسجيل بنجاح!', m);

        if (conn.tekateki1[id][2].length >= maxPlayers) {
            let tekateki1 = await (await fetch(`https://raw.githubusercontent.com/miku-655/-/main/dd.json`)).json();
            let json = tekateki1[Math.floor(Math.random() * tekateki1.length)];
            conn.tekateki1[id][1] = json;
            let playersList = conn.tekateki1[id][2].map((player, i) => `${i + 1} - @${player.id.split('@')[0]} [${player.points} نقطة]`).join('\n');
            let question = `السؤال: ${json.question}`;//\n\n${playersList}
            conn.reply(m.chat, question, m);
        }
    } else if (command === "حذف-مسابقه") {
        if (!conn.tekateki1[id]) {
            conn.reply(m.chat, 'لـم تـبـدأ الـمـبـاره بـعـد', m);
        } else {
            delete conn.tekateki1[id];
            conn.reply(m.chat, 'تـم حـذف المباراه بـنـجـاح', m);
        }
    }
};

handler.before = async function (m, { conn }) {
  let id = m.chat;
  this.tekateki1 = this.tekateki1 ? this.tekateki1 : {};

  if (!(id in this.tekateki1)) return;

  let json = this.tekateki1[id][1];
  let players = this.tekateki1[id][2];
  let questionCount = this.tekateki1[id][3];

  if (json && json.response && m.text.toLowerCase() === json.response.toLowerCase()) {
      let playerIndex = players.findIndex(player => player.id === m.sender);
      players[playerIndex].points += points;
      questionCount++;

      if (players.length === 2) {
          let winner = players[playerIndex];
          this.reply(m.chat, `المسابقة انتهت! الفائز هو @${winner.id.split('@')[0]} بـ ${winner.points} نقطة.`, m, { mentions: [winner.id] });
          delete this.tekateki1[id];
      } else {
          // إرسال قائمة باللاعبين المتبقين
          let playersList = players.map((player, i) => `${i + 1} - @${player.id.split('@')[0]} [${player.points} نقطة]`).join('\n');
          this.reply(m.chat, `@${m.sender.split('@')[0]} أجاب بشكل صحيح! يمكنه الآن استبعاد لاعب عن طريق كتابة "#" متبوعًا برقم ترتيب اللاعب.\n\nاللاعبون المتبقون:\n\n${playersList}`, m, { mentions: conn.parseMention(playersList) });
      }
  } else if (m.text.startsWith("#") && players.length > 2) {
      let playerIndex = parseInt(m.text.replace("#", "")) - 1;
      if (playerIndex < players.length && playerIndex !== players.findIndex(player => player.id === m.sender)) {
          players.splice(playerIndex, 1);
          let playersList = players.map((player, i) => `${i + 1} - @${player.id.split('@')[0]} [${player.points} نقطة]`).join('\n');
          this.reply(m.chat, `تم استبعاد اللاعب. اللاعبون المتبقون:\n\n${playersList}`, m, { mentions: conn.parseMention(playersList) });
          let tekateki1 = await (await fetch(`https://raw.githubusercontent.com/miku-655/-/main/dd.json`)).json();
          json = tekateki1[Math.floor(Math.random() * tekateki1.length)];
          this.tekateki1[id][1] = json;
          let question = `السؤال: ${json.question}`;
          conn.reply(m.chat, question, m);
      } else {
          conn.reply(m.chat, 'رقم اللاعب غير صحيح أو حاولت استبعاد نفسك', m);
      }
  }
};

handler.command = /^(مسابقه|انضمام|حذف-مسابقه)$/i;

export default handler;
