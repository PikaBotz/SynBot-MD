const Secktor = require('../lib')
Secktor.cmd({
        pattern: "ping",
        desc: "To check ping",
        category: "general",
        filename: __filename,
    },
    async(SynPika, Syn) => {
        var inital = new Date().getTime();
        await Syn.reply('```Ping!!!```');
        var final = new Date().getTime();
        return await Syn.reply('*Pong*\n *' + (final - inital) + ' ms* ');
    }
);