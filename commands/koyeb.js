const axios = require('axios');
const { tlang,cmd } = require('../lib')
const { redeploy , getvar , delvar , getallvar , change_env , get_deployments} = require('../lib/koyeb')

//----------------------------------------------------------------------------------------------------------------------------------------------------
cmd(
  {
    pattern: "updatenow",
    desc: "update bot with refreshed commit.",
    filename: __filename,
    category: "misc",
  },
  async (SynPika,Syn,text,{isCreator}) => {
       if(!isCreator) return Syn.reply(tlang().owner);
       let check = await get_deployments()
       if(check==='true') return Syn.reply('_Please wait..._\n_Currently 2 instances are running in Koyeb,wait to stop one of them._')
       let data = await redeploy();
       return Syn.reply(data)
  })
//----------------------------------------------------------------------------------------------------------------------------------------------------
cmd(
  {
    pattern: "getvar",
    desc: "get desired var from koyeb.",
    filename: __filename,
    category: "misc",
  },
  async (SynPika,Syn,text,{isCreator}) => {
       if(!isCreator) return Syn.reply(tlang().owner);
       if(!text) return Syn.reply('Please provide key.\n_Eg: .getvar PORT_')
       let data = await getvar(text);
       return Syn.reply(data)
  })
//----------------------------------------------------------------------------------------------------------------------------------------------------
cmd(
  {
    pattern: "getallvar",
    desc: "get all vars from koyeb.",
    filename: __filename,
    category: "misc",
  },
  async (SynPika,Syn,text,{isCreator}) => {
       if(!isCreator) return Syn.reply(tlang().owner);
       let data = await getallvar();
       return Syn.reply(data)
  })
//----------------------------------------------------------------------------------------------------------------------------------------------------
cmd(
  {
    pattern: "setvar",
    desc: "set var in koyeb.",
    filename: __filename,
    category: "misc",
  },
  async (SynPika,Syn,text,{isCreator}) => {
       if(!isCreator) return Syn.reply(tlang().owner);
       if(!text.split(':')[1]) return Syn.reply('*Wrong Format.*\nPlease provide key and value.\n_Eg: .setvar THEME:SECKTOR_')
       let check = await get_deployments()
       if(check==='true') return Syn.reply('_Please wait..._\n_Currently 2 instances are running in Koyeb,wait to stop one of them._')
       let data = await change_env(text)
       return Syn.reply(data)
  })

//----------------------------------------------------------------------------------------------------------------------------------------------------
cmd(
  {
    pattern: "delvar",
    desc: "delete var from koyeb.",
    filename: __filename,
    category: "misc",
  },
  async (SynPika,Syn,text,{isCreator}) => {
       if(!isCreator) return Syn.reply(tlang().owner);
       if(!text) return Syn.reply('Please provide key.\n_Eg: .delvar PORT_')
       let check = await get_deployments()
       if(check==='true') return Syn.reply('_Please wait..._\n_Currently 2 instances are running in Koyeb,wait to stop one of them._')
       let data = await delvar(text)
       return Syn.reply(data)
  })
