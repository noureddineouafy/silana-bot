// styles.mjs
const Styles = (text, style = 1) => {
  var xStr = "abcdefghijklmnopqrstuvwxyz1234567890".split("");
  var yStr = Object.freeze({
    1: "ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘqʀꜱᴛᴜᴠᴡxʏᴢ1234567890",
  });
  var replacer = [];
  xStr.map((v, i) =>
    replacer.push({
      original: v,
      convert: yStr[style].split("")[i],
    }),
  );
  var str = text.toLowerCase().split("");
  var output = [];
  str.map((v) => {
    const find = replacer.find((x) => x.original == v);
    find ? output.push(find.convert) : output.push(v);
  });
  return output.join("");
};

export { Styles };
