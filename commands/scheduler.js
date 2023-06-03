const { tlang,sck,prefix,cmd } = require('../lib')
 cmd({
     pattern: "amute",
     desc: "sets auto mute time in group.",
     category: "moderation",
 },
 async(SynPika, Syn, text,{ isCreator }) => {
     if (!isCreator) return Syn.reply(tlang().owner)
     if(!Syn.isGroup) return Syn.reply(tlang().group)
     if(!text.split(':')[1]) return Syn.reply(`Please provide correct form.\nEg: setmute ${prefix}22:00`)
     //if(!Number.isInteger(text.split(':')[0])) return Syn.reply(`Please provide correct form.\nEg: setmute ${prefix}22:00`);
     //if(!Number.isInteger(text.split(':')[1])) return Syn.reply(`Please provide correct form.\nEg: setmute ${prefix}22:00`)
           let Group = await sck.findOne({ id: Syn.chat })
             if (!Group) {
                 await new sck({ id: Syn.chat, mute: text }).save()
                 return Syn.reply('Mute added.')
             } else {
                 await await sck.updateOne({ id: Syn.chat }, { mute:text })
                 return Syn.reply(`_Mute added for ${text} successfully._`)     
             }      
 }
 )

 //--------------------------------------------------------------------------------
 cmd({
    pattern: "aunmute",
    desc: "sets unmute time in group.",
    category: "moderation",
},
async(SynPika, Syn, text,{ isCreator }) => {
    if (!isCreator) return Syn.reply(tlang().owner)
    if(!Syn.isGroup) return Syn.reply(tlang().group)
    if(!text.split(':')[0]) return Syn.reply(`Please provide correct form.\nEg: setmute ${prefix}22:00`)
   // if(!Number.isInteger(text.split(':')[0])) return Syn.reply(`Please provide correct form.\nEg: setmute ${prefix}22:00`);
   // if(!Number.isInteger(text.split(':')[1])) return Syn.reply(`Please provide correct form.\nEg: setmute ${prefix}22:00`)
          let Group = await sck.findOne({ id: Syn.chat })
            if (!Group) {
                await new sck({ id: Syn.chat, unmute: text }).save()
                return Syn.reply('Mute added.')
            } else {
                await await sck.updateOne({ id: Syn.chat }, { unmute:text })
                return Syn.reply(`_Unmute updated for ${text} successfully._`)
                
            }      
}
)
 //--------------------------------------------------------------------------------
 cmd({
    pattern: "dunmute",
    desc: "Delete unmute from group.",
    category: "moderation",
},
async(SynPika, Syn, text,{ isCreator }) => {
    if (!isCreator) return Syn.reply(tlang().owner)
    if(!Syn.isGroup) return Syn.reply(tlang().group)
          let Group = await sck.findOne({ id: Syn.chat })
            if (!Group) {
                return Syn.reply('There\'s no unmute set in group.')
            } else {
                await await sck.updateOne({ id: Syn.chat }, { unmute:'false' })
                return Syn.reply('Unmute deleted successfully.')
                
            }      
}
)
 //--------------------------------------------------------------------------------
 cmd({
    pattern: "dmute",
    desc: "Delete mute from group.",
    category: "moderation",
},
async(SynPika, Syn, text,{ isCreator }) => {
    if (!isCreator) return Syn.reply(tlang().owner)
    if(!Syn.isGroup) return Syn.reply(tlang().group)
          let Group = await sck.findOne({ id: Syn.chat })
            if (!Group) {
                return Syn.reply('There\'s no mute set in group.')
            } else {
                await await sck.updateOne({ id: Syn.chat }, { mute:'false' })
                return Syn.reply('Mute deleted successfully.')
                
            }      
}
)
 //--------------------------------------------------------------------------------
