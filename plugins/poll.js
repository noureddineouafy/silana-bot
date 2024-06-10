let handler = async (m, {
    conn,
    text,
    args,
    usedPrefix,
    command
}) => {

    let a = text.split("|").slice(1)
    if (!a[1]) throw "مثال :\n.poll bobiza is the best bot yes|no|🔥  "
    if (a[12]) throw "Kebanyakan pilihan, Format\n" + usedPrefix + command + " halo |ya|gak"
    if (checkDuplicate(a)) throw "Ada kesamaan isi dalam pesan!"
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
handler.command = /^poll$/i
handler.owner = true
export default handler

function checkDuplicate(arr) {
    return new Set(arr).size !== arr.length
}
