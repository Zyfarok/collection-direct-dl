const axios = require('axios');

window.collectionOpenDirect = function() {
    // TODO : Use form inputs...
    let colId = 0;
    let useBeatmapSet = true;
    let delay = 500;
    console.log("Openning collection with parameters:", colId, useBeatmapSet, delay);
    
    function getBeatmaps(callback) {
        function getBeatmapsFrom(offset, acc) {
            axios.get(`https://osustats.ppy.sh/apiv2/collection/${colId}/beatmaps?offset=${offset}`)
                .then(res => {
                    let newBeatmaps = res.data;
                    let nacc = acc.concat(newBeatmaps);
                    if(newBeatmaps.length == 100) {
                        getBeatmapsFrom(offset + 100, nacc);
                    } else {
                        callback(nacc);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
               callback([{beatmapId:10,beatmap:{beatmapSetId:1}},{beatmapId:20,beatmap:{beatmapSetId:2}}])
        }
        getBeatmapsFrom(0, [])
    }
    
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    getBeatmaps(async maps => {
        console.log(maps.length)
    
        for(i in maps) {
            let prefix = useBeatmapSet ? "dl" : "b"
            let id = useBeatmapSet ? maps[i].beatmap.beatmapSetId : maps[i].beatmapId
            let url = `osu://${prefix}/${id}`
            console.log(`openning ${url}...`)
            // TODO : Actually open url...
            await sleep(delay);
        }
    });
};