const { Insta,cmd } = require('../lib')
cmd({
        pattern: "insta",
        desc: "Anyone can download Instagram post by this command .",
        category: "downloader",
        filename: __filename
    },
    async(SynPika, Syn,text,{isCreator}) => {
if(!text) return Syn.reply('I need a insta post URL to proceed')
let response = await Insta(text)
for (let i=0;i<response.length;i++) {
await SynPika.sendFileUrl(Syn.chat, response[i], `*Downloaded Media from instagram.*`, Syn)
}
    });
