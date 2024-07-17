
export async function before(m) {
    try {
        let id = m.chat;
        let timeout = 180000;
        let reward = randomInt(100, 80000);
        let users = global.db.data.users[m.sender];
        let body = typeof m.text == 'string' ? m.text : false;
        this.bomb = this.bomb ? this.bomb : {};

        let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.text);
        if (isSurrender) {
            await this.reply(m.chat, `🚩 يستسلم`, m);
            clearTimeout(this.bomb[id][2]);
            delete this.bomb[id];
        }

        if (this.bomb[id] && m.quoted && m.quoted.id == this.bomb[id][3].id && !isNaN(body)) {
            let json = this.bomb[id][1].find(v => v.position == body);
            if (!json) return this.reply(m.chat, `🚩 لفتح الصندوق أرسل الأرقام من 1 إلى 9`, m);

            if (json.emot == '💥') {
                json.state = true;
                let bomb = this.bomb[id][1];
                let teks = `乂  *B O M B*\n\n`;
                teks += bomb.slice(0, 3).map(v => v.state ? v.emot : v.number).join('') + '\n';
                teks += bomb.slice(3, 6).map(v => v.state ? v.emot : v.number).join('') + '\n';
                teks += bomb.slice(6).map(v => v.state ? v.emot : v.number).join('') + '\n\n';
                teks += `نفذ الوقت : [ *${((timeout / 1000) / 60)} menit* ]\n`;
                teks += `*انتهت اللعبة!*، يفتح الصندوق الذي يحتوي على القنبلة: (- *${formatNumber(reward)}*)`;

                this.reply(m.chat, teks, m).then(() => {
                    users.exp < reward ? users.exp = 0 : users.exp -= reward;
                    clearTimeout(this.bomb[id][2]);
                    delete this.bomb[id];
                });
            } else if (json.state) {
                return this.reply(m.chat, `🚩 صندوق ${json.number} بمجرد فتحه، يرجى تحديد مربع آخر.`, m);
            } else {
                json.state = true;
                let changes = this.bomb[id][1];
                let open = changes.filter(v => v.state && v.emot != '💥').length;

                if (open >= 8) {
                    let teks = `乂  *B O M B*\n\n`;
                    teks += `أرسل الأرقام *1* - *9* لفتح مربع الأرقام *9* أدناه:\n\n`;
                    teks += changes.slice(0, 3).map(v => v.state ? v.emot : v.number).join('') + '\n';
                    teks += changes.slice(3, 6).map(v => v.state ? v.emot : v.number).join('') + '\n';
                    teks += changes.slice(6).map(v => v.state ? v.emot : v.number).join('') + '\n\n';
                    teks += `نفذ الوقت : [ *${((timeout / 1000) / 60)} menit* ]\n`;
                    teks += `*انتهت اللعبة!* الصندوق الذي يحتوي على القنبلة لا يفتح: (+ *${formatNumber(reward)}*)`;

                    this.reply(m.chat, teks, m).then(() => {
                        users.exp += reward;
                        clearTimeout(this.bomb[id][2]);
                        delete this.bomb[id];
                    });
                } else {
                    let teks = `乂  *B O M B*\n\n`;
                    teks += `أرسل الأرقام *1* - *9* لفتح مربع الأرقام *9* أدناه :\n\n`;
                    teks += changes.slice(0, 3).map(v => v.state ? v.emot : v.number).join('') + '\n';
                    teks += changes.slice(3, 6).map(v => v.state ? v.emot : v.number).join('') + '\n';
                    teks += changes.slice(6).map(v => v.state ? v.emot : v.number).join('') + '\n\n';
                    teks += `نفذ الوقت : [ *${((timeout / 1000) / 60)} menit* ]\n`;
                    teks += `ولم يفتح الصندوق الذي يحتوي على القنبلة : (+ *${formatNumber(reward)}*)`;

                    this.relayMessage(m.chat, {
                    protocolMessage: {
                        key: this.bomb[id][3],
                        type: 14,
                        editedMessage: {
                            conversation: teks
                        }
                    }
                }, {}).then(() => {
                        users.exp += reward;
                    });
                }
            }
        }
    } catch (e) {
        return this.reply(m.chat, e, m);
    }
    return !0;
}

export const exp = 0;

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function formatNumber(number) {
    return number.toLocaleString();
        }
