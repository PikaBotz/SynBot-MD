const {fetchJson,cmd,prefix} = require('../lib');
const axios = require('axios');
const load = '```Loading...```'
const react = "😋"

// ⚠️ DOWNLOAD WEEBPACK FOR MORE
cmd({
        pattern: "waifu",
        alias: ["waifus"],
        category: "weeb",
        desc: "Search and get pics of *Hot Anime Waifus*.",
        react: react,
        filename: __filename
    },
        async(Void, citel, text) => {
            let waifu = await axios.get('https://waifu.pics/api/sfw/waifu');
            Syn.reply(load);
            SynPika.sendMessage(Syn.chat, {
                image: {
                    url: waifu.data.url,
                },
                caption: `_Type *${prefix}waifu* again for more._`,
            }, {
                quoted: citel,
            });

        }
    );

    cmd({
        pattern: "loli",
        alias: ["lolis"],
        category: "weeb",
        desc: "Search and get pics of *Hot Anime lolis*.",
        react: react,
        filename: __filename
    },
        async(Void, citel, text) => {
            let loli = await axios.get('https://waifu.pics/api/sfw/loli');
            Syn.reply(load);
            SynPika.sendMessage(Syn.chat, {
                image: {
                    url: loli.data.url,
                },
                caption: `_Type *${prefix}loli* again for more._`,
            }, {
                quoted: citel,
            });

        }
    );
    
        cmd({
        pattern: "neko",
        alias: ["nekos"],
        category: "weeb",
        desc: "Search and get pics of *Hot Anime nekos*.",
        react: react,
        filename: __filename
    },
        async(Void, citel, text) => {
            let neko = await axios.get('https://waifu.pics/api/sfw/neko');
            Syn.reply(load);
            SynPika.sendMessage(Syn.chat, {
                image: {
                    url: neko.data.url,
                },
                caption: `_Type *${prefix}neko* again for more._`,
            }, {
                quoted: citel,
            });

        }
    );
    
            cmd({
        pattern: "megumin",
        alias: ["megumins"],
        category: "weeb",
        desc: "Search and get pics of *Hot Anime megumin*.",
        react: react,
        filename: __filename
    },
        async(Void, citel, text) => {
            let megumin = await axios.get('https://waifu.pics/api/sfw/megumin');
            Syn.reply(load);
            SynPika.sendMessage(Syn.chat, {
                image: {
                    url: megumin.data.url,
                },
                caption: `_Type *${prefix}megumin* again for more._`,
            }, {
                quoted: citel,
            });

        }
    );
    
    cmd({
        pattern: "tsunade",
        category: "weeb",
        desc: `Get high quality pics of *tsunade*.`,
        react: react,
        filename: __filename
    },
        async(Void, citel, text) => {
            let weeb = await fetchJson('https://raw.githubusercontent.com/shizothetechie/ShizoApi-Scrapper/main/anime/tsunade.json');
            let pic = weeb[Math.floor(Math.random() * weeb.length)];
            Syn.reply(load);
            SynPika.sendMessage(Syn.chat, {
                image: {
                    url: pic.url,
                },
                caption: `_Type *${prefix}tsunade* again for more._`,
            }, {
                quoted: citel,
            });

        }
    );
    
    cmd({
        pattern: "hinata",
        category: "weeb",
        desc: `Get high quality pics of *hinata*.`,
        react: react,
        filename: __filename
    },
        async(Void, citel, text) => {
            let weeb = await fetchJson('https://raw.githubusercontent.com/shizothetechie/ShizoApi-Scrapper/main/anime/hinata.json');
            let pic = weeb[Math.floor(Math.random() * weeb.length)];
            Syn.reply(load);
            SynPika.sendMessage(Syn.chat, {
                image: {
                    url: pic.url,
                },
                caption: `_Type *${prefix}hinata* again for more._`,
            }, {
                quoted: citel,
            });

        }
    );
    
    cmd({
        pattern: "itachi",
        category: "weeb",
        desc: `Get high quality pics of *itachi*.`,
        react: react,
        filename: __filename
    },
        async(Void, citel, text) => {
            let weeb = await fetchJson('https://raw.githubusercontent.com/shizothetechie/ShizoApi-Scrapper/main/anime/itachi.json');
            let pic = weeb[Math.floor(Math.random() * weeb.length)];
            Syn.reply(load);
            SynPika.sendMessage(Syn.chat, {
                image: {
                    url: pic.url,
                },
                caption: `_Type *${prefix}itachi* again for more._`,
            }, {
                quoted: citel,
            });

        }
    );
    
    cmd({
        pattern: "kakashi",
        category: "weeb",
        desc: `Get high quality pics of *kakashi*.`,
        react: react,
        filename: __filename
    },
        async(Void, citel, text) => {
            let weeb = await fetchJson('https://raw.githubusercontent.com/shizothetechie/ShizoApi-Scrapper/main/anime/kakashi.json');
            let pic = weeb[Math.floor(Math.random() * weeb.length)];
            Syn.reply(load);
            SynPika.sendMessage(Syn.chat, {
                image: {
                    url: pic.url,
                },
                caption: `_Type *${prefix}kakashi* again for more._`,
            }, {
                quoted: citel,
            });

        }
    );