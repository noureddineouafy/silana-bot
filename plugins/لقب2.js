import { createHash } from 'crypto';

const handler = async function(m, { conn, text, usedPrefix }) {
  let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;

  const requestedName = text.trim(); // Name to check

  const user = global.db.data.users[who];
  const { name } = global.db.data.users[who];
  const userName = name;

  // Check if the requested name matches any existing user's name
  const isNameTaken = Object.values(global.db.data.users).some(
    userData => typeof userData.name === 'string' && userData.name.toLowerCase() === requestedName.toLowerCase()
  );

  if (isNameTaken) {
    // Name is taken
    const usersWithSameName = Object.keys(global.db.data.users).filter(
      key => typeof global.db.data.users[key].name === 'string' && global.db.data.users[key].name.toLowerCase() === requestedName.toLowerCase()
    );

    const usersWithSameNameInfo = usersWithSameName.map(userId => {
      const userInfo = global.db.data.users[userId];
      const tag = `${userId.replace(/@.+/, '')}`;
      return `${conn.getName(tag)}`;
    });



    m.reply(
      `*لقب "${requestedName}" مأخوذ بواسطة :* \n${usersWithSameNameInfo.join(
        '\n'
      )}`
    );
  } else {
    // Name is not taken
    m.reply(`*✅اللقب متوفر*`);
  }
};

handler.help = ['myns <name>'];
handler.tags = ['xp'];
handler.command = /^(لقب)$/i;
handler.register = true;

export default handler;
