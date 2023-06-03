 const { tlang, getAdmin, prefix, Config, sck, fetchJson, runtime,cmd } = require('../lib')
 let { dBinary, eBinary } = require("../lib/binary");
const { Sticker, createSticker, StickerTypes } = require("wa-sticker-formatter");
 const fs = require('fs')
 const axios = require('axios')
  //---------------------------------------------------------------------------
 cmd({
    pattern: "setwelcome",
    desc: "sets welcome message in specific group.",
    category: "misc",
},
async(SynPika, Syn, text,{ isCreator }) => {
    if (!isCreator) return Syn.reply(tlang().owner)
          let Group = await sck.findOne({ id: Syn.chat })
            if (!Group) {
                await new sck({ id: Syn.chat, welcome: text,events:'true' }).save()
                return Syn.reply('Welcome added added for this group.')
            } else {
                await await sck.updateOne({ id: Syn.chat }, { welcome:text ,events:'true'})
                return Syn.reply('Welcome updated successfully.')
                
            }      
}
)
 //---------------------------------------------------------------------------
cmd({
    pattern: "setgoodbye",
    desc: "sets goodbye message in specific group.",
    category: "misc",
},
async(SynPika, Syn, text,{ isCreator }) => {
    if (!isCreator) return Syn.reply(tlang().owner)
          let Group = await sck.findOne({ id: Syn.chat })
            if (!Group) {
                await new sck({ id: Syn.chat, goodbye: text,events:'true' }).save()
                return Syn.reply('Goodbye added for this group.');
            } else {
                await await sck.updateOne({ id: Syn.chat }, { goodbye:text,events:'true' })
                return Syn.reply('Goodbye updated successfully.');     
            }      
}
)
 //---------------------------------------------------------------------------
 cmd({
             pattern: "attp",
             desc: "Makes glowing sticker of text.",
             category: "sticker",
             filename: __filename,
         },
         async(SynPika, Syn, text) => {
             SynPika.sendMessage(Syn.chat, {
                 sticker: {
                     url: `https://api.xteam.xyz/attp?file&text=${encodeURI(text)}`
                 }
             }, {
                 quoted: Syn
             })
 
         }
     )
     //---------------------------------------------------------------------------
 cmd({
             pattern: "exec",
             desc: "Evaluates quoted code with given language.",
             category: "misc",
             filename: __filename,
         },
         async(SynPika, Syn, text) => {
             try {
                 const code = {
                     script: Syn.quoted.text,
                     language: text[1],
                     versionIndex: "0",
                     stdin: text.slice(2).join(" "),
                     clientId: '694805244d4f825fc02a9d6260a54a99',
                     clientSecret: '741b8b6a57446508285bb5893f106df3e20f1226fa3858a1f2aba813799d4734'
                 };
                 request({
                     url: "https://api.jdoodle.com/v1/execute",
                     method: "POST",
                     json: code
                 }, function(_error, _response, body) {
                     Syn.reply("> " + text[1] + "\n\n" + "```" + body.output + "```");
                 });
             } catch (error) {
                 console.log(error);
             }
         }
     )
     //---------------------------------------------------------------------------
 cmd({
             pattern: "readmore",
             desc: "Adds *readmore* in given text.",
             category: "misc",
             filename: __filename,
         },
         async(SynPika, Syn, text) => {
             await Syn.reply(text.replace(/\+/g, (String.fromCharCode(8206)).repeat(4001)))
 
         }
     )
     //---------------------------------------------------------------------------
 cmd({
             pattern: "steal",
             desc: "Makes sticker of replied image/video.",
             category: "sticker",
             filename: __filename,
         },
         async(SynPika, Syn, text) => {
             if (!Syn.quoted) return Syn.reply(`*Mention any Image or video Sir.*`);
             let mime = Syn.quoted.mtype
             var pack;
             var author;
             if (text) {
                 anu = text.split("|");
                 pack = anu[0] !== "" ? anu[0] : Syn.pushName + '♥️';
                 author = anu[1] !== "" ? anu[1] : Config.author;
             } else {
                 pack = Syn.pushName;
                 author = "♥️";
             }
                 let media = await Syn.quoted.download();
                 Syn.reply("*Processing Your request*");
                let sticker = new Sticker(media, {
                    pack: pack, // The pack name
                    author: author, // The author name
                    type: text.includes("--crop" || '-c') ? StickerTypes.CROPPED : StickerTypes.FULL,
                    categories: ["🤩", "🎉"], // The sticker category
                    id: "12345", // The sticker id
                    quality: 75, // The quality of the output file
                    background: "transparent", // The sticker background color (only for full stickers)
                });
                const buffer = await sticker.toBuffer();
                return SynPika.sendMessage(Syn.chat, {sticker: buffer }, {quoted: Syn });
         }
     )
     //---------------------------------------------------------------------------
 cmd({
             pattern: "uptime",
             alias: ["runtime"],
             desc: "Tells runtime/uptime of bot.",
             category: "misc",
             filename: __filename,
         },
         async(SynPika, Syn, text) => {
             const upt = runtime(process.uptime())
             Syn.reply(`Uptime of ${tlang().title}: ${upt}`)
         }
     )
     //---------------------------------------------------------------------------
 cmd({
             pattern: "wm",
             desc: "Makes wa me of quoted or mentioned user.",
             category: "misc",
             filename: __filename,
         },
         async(SynPika, Syn, text) => {
             let users = Syn.mentionedJid ? Syn.mentionedJid[0].split('@')[0] : Syn.quoted ? Syn.quoted.sender.split('@')[0] : text.replace('@')[0]
             Syn.reply(`https://wa.me/${users}`)
 
         }
     )
     //---------------------------------------------------------------------------
 cmd({
             pattern: "pick",
             desc: "Pics random user from Group",
             category: "misc",
             filename: __filename,
         },
         async(SynPika, Syn, match) => {
             if (!match) return Syn.reply("*Which type of User you want?*");
             const groupMetadata = Syn.isGroup ? await SynPika.groupMetadata(Syn.chat)
                 .catch((e) => {}) : "";
             const participants = Syn.isGroup ? await groupMetadata.participants : "";
             let member = participants.map((u) => u.id);
             let me = Syn.sender;
             let pick = member[Math.floor(Math.random() * member.length)];
             SynPika.sendMessage(Syn.chat, {
                 text: `The most ${match} around us is *@${pick.split("@")[0]}*`,
                 mentions: [pick],
             }, {
                 quoted: Syn,
             });
         }
     )
     //---------------------------------------------------------------------------
 cmd({
             pattern: "nsfw",
             desc: "activates and deactivates nsfw.\nuse buttons to toggle.",
             category: "misc",
             filename: __filename,
         },
         async(SynPika, Syn, text) => {
             if (!Syn.isGroup) return Syn.reply(tlang().group);
             const groupAdmins = await getAdmin(SynPika, Syn)
             const botNumber = await SynPika.decodeJid(SynPika.user.id)
             const isBotAdmins = Syn.isGroup ? groupAdmins.includes(botNumber) : false;
             const isAdmins = Syn.isGroup ? groupAdmins.includes(Syn.sender) : false;
             if (!isAdmins) return Syn.reply(tlang().admin)
             if (!isBotAdmins) return Syn.reply(tlang().botadmin)
             let buttons = [{
                     buttonId: `${prefix}act nsfw`,
                     buttonText: {
                         displayText: "Turn On",
                     },
                     type: 1,
                 },
                 {
                     buttonId: `${prefix}deact nsfw`,
                     buttonText: {
                         displayText: "Turn Off",
                     },
                     type: 1,
                 },
             ];
             await SynPika.sendButtonText(Syn.chat, buttons, `Activate nsfw:18+ commands`, SynPika.user.name, Syn);
         }
     )
     //---------------------------------------------------------------------------
 cmd({
             pattern: "npm",
             desc: "download mp4 from url.",
             category: "search",
             use: '<package name>',
             filename: __filename,
         },
         async(SynPika, Syn, text) => {
             if (!text) return Syn.reply('Please give me package name.📦')
             axios.get(`https://api.npms.io/v2/search?q=${text}`).then(({ data }) => {
                 let txt = data.results.map(({ package: pkg }) => `*${pkg.name}* (v${pkg.version})\n_${pkg.links.npm}_\n_${pkg.description}_`).join('\n\n')
                 Syn.reply(txt)
             }).catch(e => console.log(e))
         }
     )
     //---------------------------------------------------------------------------
 cmd({
             pattern: "fliptext",
             desc: "Flips given text.",
             category: "misc",
             use: '<query>',
             filename: __filename,
         },
         async(SynPika, Syn, text) => {
             if (!text) return Syn.reply(`Example : ${prefix}fliptext Back in black`)
             flipe = text.split('').reverse().join('')
             Syn.reply(`\`\`\`「  Text Flipper Tool  」\`\`\`\n*IGiven text :*\n${text}\n*Fliped text :*\n${flipe}`)
 
         }
     )
     //---------------------------------------------------------------------------
 cmd({
             pattern: "mp4fromurl",
             desc: "download mp4 from url.",
             category: "misc",
             use: '<url>',
             filename: __filename,
         },
         async(SynPika, Syn, text) => {
             if (!text) return Syn.reply(`Where's the link ?`);
             SynPika.sendMessage(Syn.chat, {
                 video: {
                     url: text.split(" ")[0],
                 },
                 caption: "*HERE WE GO*",
                 contextInfo: {
                     externalAdReply: {
                         title: tlang().title,
                         body: `${Syn.pushName}`,
                         thumbnail: log0,
                         mediaType: 2,
                         mediaUrl: ``,
                         sourceUrl: ``,
                     },
                 },
             }, {
                 quoted: Syn,
             });
 
         }
     )
     //---------------------------------------------------------------------------
 cmd({
             pattern: "events",
             desc: "activates and deactivates events.\nuse buttons to toggle.",
             category: "misc",
             filename: __filename,
         },
         async(SynPika, Syn, text) => {
             if (!Syn.isGroup) return Syn.reply(tlang().group);
             const groupAdmins = await getAdmin(SynPika, Syn)
             const botNumber = await SynPika.decodeJid(SynPika.user.id)
             const isBotAdmins = Syn.isGroup ? groupAdmins.includes(botNumber) : false;
             const isAdmins = Syn.isGroup ? groupAdmins.includes(Syn.sender) : false;
             if (!isAdmins) return Syn.reply(tlang().admin)
             if (!isBotAdmins) return Syn.reply(tlang().botadmin)
             let buttons = [{
                     buttonId: `${prefix}act events`,
                     buttonText: {
                         displayText: "Turn On",
                     },
                     type: 1,
                 },
                 {
                     buttonId: `${prefix}deact events`,
                     buttonText: {
                         displayText: "Turn Off",
                     },
                     type: 1,
                 },
             ];
             await SynPika.sendButtonText(Syn.chat, buttons, `Activate Events:Welcome & goodbye`, SynPika.user.name, Syn);
         }
     )
     //---------------------------------------------------------------------------
 cmd({
             pattern: "emix",
             desc: "Mixes two emojies.",
             category: "misc",
             use: '<query>',
             filename: __filename,
         },
         async(SynPika, Syn, text,{ isCreator }) => {
             if (!text) return Syn.reply(`Example : ${prefix}emix 😅,🤔`);
             let [emoji1, emoji2] = text.split `,`;
             let anu = await fetchJson(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji1 )}_${encodeURIComponent(emoji2)}`);
             for (let res of anu.results) {
                 let encmedia = await SynPika.sendImageAsSticker(Syn.chat, res.url, Syn, {
                     packname: global.packname,
                     author: global.author,
                     categories: res.tags,
                 });
                 await fs.unlinkSync(encmedia);
             }
         }
     )
     //---------------------------------------------------------------------------
 cmd({
             pattern: "chatbot",
             desc: "activates and deactivates chatbot.\nuse buttons to toggle.",
             category: "misc",
             filename: __filename
         },
         async(SynPika, Syn, text,{ isCreator }) => {
             if (!isCreator) return Syn.reply(tlang().owner)
             const { chatbot } = require('../lib/');
             switch (text.split(" ")[0]) {
                 case "on":
                     {
                      let chatbott= await chatbot.findOne({ id: 'chatbot' })
                     if (!chatbott) {
                         await new chatbot({ id: 'chatbot', worktype: "true" }).save()
                         return Syn.reply('Chatbot activated successfully.')
                     } else {
                         if (chatbott.worktype == "true") return Syn.reply("Chatbot was already enabled.")
                         await chatbot.updateOne({ id: 'chatbot' }, { worktype: "true" })
                         Syn.reply('Enabled chatbot successfully.')
                         return
                     }      
                     }
                     break
                 case "off":
                     {
                      let chatbott= await chatbot.findOne({ id: 'chatbot' })
                     if (!chatbott) {
                         await new chatbot({ id: 'chatbot', worktype: "false" }).save()
                         return Syn.reply('Chatbot deactivated successfully.')
                     } else {
                         if (chatbott.worktype == "false") return Syn.reply("Chatbot was already disabled.")
                         await chatbot.updateOne({ id: 'chatbot' }, { worktype: "false" })
                         Syn.reply('Disabled chatbot successfully.')
                         return
                     }
                     }
                     break
                 default:
                     {
                         let buttons = [{
                                 buttonId: `${prefix}chatbot on`,
                                 buttonText: {
                                     displayText: "Turn On",
                                 },
                                 type: 1,
                             },
                             {
                                 buttonId: `${prefix}chatbot off`,
                                 buttonText: {
                                     displayText: "Turn Off",
                                 },
                                 type: 1,
                             },
                         ];
                         let chatbott= await chatbot.findOne({ id: 'chatbot' })
                         await SynPika.sendButtonText(Syn.chat, buttons, `Chatbot Status: ${chatbott.worktype} `, 'Secktor-Md', Syn);
                     }
             }
 
 
         }
     )
     //---------------------------------------------------------------------------
 cmd({
             pattern: "ebinary",
             desc: "encode binary",
             category: "misc",
             use: '<query>',
             filename: __filename,
         },
         async(SynPika, Syn, text,{ isCreator }) => {
             try {
                 if (!text) return Syn.reply(`Send text to be encoded.`);
 
                 let textt = text || Syn.quoted.text
                 let eb = await eBinary(textt);
                 Syn.reply(eb);
             } catch (e) {
                 console.log(e)
             }
         }
     )
     //---------------------------------------------------------------------------
 cmd({
             pattern: "dbinary",
             desc: "decode binary",
             category: "misc",
             use: '<query>',
             filename: __filename,
         },
         async(SynPika, Syn, text,{ isCreator }) => {
             try {
                 if (!text) return Syn.reply(`Send text to be decoded.`);
                 let eb = await dBinary(text);
                 Syn.reply(eb);
             } catch (e) {
                 console.log(e)
             }
         }
     )
cmd({
  pattern: "bot",
  desc: "activates and deactivates bot.\nuse buttons to toggle.",
  category: "misc",
  filename: __filename,
},
async(SynPika, Syn, text,{isCreator}) => {
  if (!Syn.isGroup) return Syn.reply(tlang().group);
  if(!isCreator) return //Syn.reply(tlang().owner)
switch (text.split(" ")[0]) {
 case 'on':{
         let checkgroup = await sck.findOne({ id: Syn.chat })
         if (!checkgroup) {
             await new sck({ id: Syn.chat, botenable: "true" }).save()
             return Syn.reply(`Successfully Enabled *${tlang().title}*`)
         } else {
             if (checkgroup.botenable == "true") return Syn.reply("*Bot* was already enabled")
             await sck.updateOne({ id: Syn.chat }, { botenable: "true" })
             return Syn.reply(`Successfully Enabled *${tlang().title}*`)
         }
     }
  
 break
case 'off':{
            {
             let checkgroup = await sck.findOne({ id: Syn.chat })
             if (!checkgroup) {
                 await new sck({ id: Syn.chat, botenable: "false" })
                     .save()
                 return Syn.reply(`Successfully disabled *${tlang().title}*`)
             } else {
                 if (checkgroup.botenable == "false") return Syn.reply("*Bot* was already disabled")
                 await sck.updateOne({ id: Syn.chat }, { botenable: "false" })
                 return Syn.reply(`Successfully disabled *${tlang().title}*`)
             }
         }
}
break
default:{
let checkgroup = await sck.findOne({ id: Syn.chat })
let buttons = [{
          buttonId: `${prefix}bot on`,
          buttonText: {
              displayText: "Turn On",
          },
          type: 1,
      },
      {
          buttonId: `${prefix}bot off`,
          buttonText: {
              displayText: "Turn Off",
          },
          type: 1,
      },
  ];
  await SynPika.sendButtonText(Syn.chat, buttons, `Bot Status in Group: ${checkgroup.botenable}`, SynPika.user.name, Syn);
}
}
})   
         
     //---------------------------------------------------------------------------
 cmd({
             pattern: "antilink",
             desc: "activates and deactivates antilink.\nuse buttons to toggle.",
             category: "group",
             filename: __filename,
         },
         async(SynPika, Syn, text) => {
             if (!Syn.isGroup) return Syn.reply(tlang().group);
             const groupAdmins = await getAdmin(SynPika, Syn)
             const botNumber = await SynPika.decodeJid(SynPika.user.id)
             const isBotAdmins = Syn.isGroup ? groupAdmins.includes(botNumber) : false;
             const isAdmins = Syn.isGroup ? groupAdmins.includes(Syn.sender) : false;
             if (!isAdmins) return Syn.reply(tlang().admin)
             if (!isBotAdmins) return Syn.reply(tlang().botadmin)
             let buttons = [{
                     buttonId: `${prefix}act antilink`,
                     buttonText: {
                         displayText: "Turn On",
                     },
                     type: 1,
                 },
                 {
                     buttonId: `${prefix}deact antilink`,
                     buttonText: {
                         displayText: "Turn Off",
                     },
                     type: 1,
                 },
             ];
             await SynPika.sendButtonText(Syn.chat, buttons, `Activate antilink:Deletes Link + kick`, SynPika.user.name, Syn);
         }
     )
     //---------------------------------------------------------------------------
 cmd({ on: "body" }, async(SynPika, Syn) => {
     if (Config.autoreaction === 'true' && Syn.text.startsWith(prefix)) {
         const emojis = ['❤', '💕', '😻', '🧡', '💛', '💚', '💙', '💜', '🖤', '❣', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '♥', '💌', '🙂', '🤗', '😌', '😉', '🤗', '😊', '🎊', '🎉', '🎁', '🎈', '👋']
         const emokis = emojis[Math.floor(Math.random() * (emojis.length))]
         SynPika    .sendMessage(Syn.chat, {
             react: {
                 text: emokis,
                 key: Syn.key
             }
         })
     }
 })
