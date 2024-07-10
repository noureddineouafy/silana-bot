let handler = async (m, {
    conn,
    text,
    args,
    usedPrefix,
    command
}) => {

    let a = text.split("|").slice(1)
    if (!a[1]) throw "مثال :\n.استطلاع العقرب هو أفضل بوت نعم|لا| 🔥  "
    if (a[12]) throw "اضغط هنا، التنسيق\n" + usedPrefix + command + " مرحبا بكم جميعا"
    if (checkDuplicate(a)) throw "Ada kesamaan isi dalam pesan! "
    let cap = "*هذا التصويت من طرف* " + m.name + "\n*الموضوع:* " + text.split("|")[0]

    const pollMessage = {
        name: cap,
        values: a,
        multiselect: false,
        selectableCount: 1
    }
    await conn.sendMessage(m.chat, {
        poll: pollMessage
    })

}
handler.help = ["poll"]
handler.tags = ["owner"]
handler.command = /^تصويت$/i
handler.owner = true
export default handler

function checkDuplicate(arr) {
    return new Set(arr).size !== arr.length
}
