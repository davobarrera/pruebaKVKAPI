// mysql -u api_user -p'user_api' < 6-tracksWithDifferentGenre.sql

import { runSQLFile } from '../util/sqlHelper.js'

export default async function ({config}){
    const scriptsPath = '/usr/scripts';
    const files = [
        // '0-reloadDB.sql',
        '1-alltrack.sql',
        '2-rockPeru.sql',
        '3-tracksWithoutArtist.sql',
        '4-albumWithoutTracks.sql',
        '5-userWithoutAlbumOrTrack.sql',
        '6-tracksWithDifferentGenre.sql'
    ];
    for(let file of files){
        loadSingleFile(`${scriptsPath}/${file}`,config)
    }
}

function loadSingleFile(file,config){
    process.stdout.write(`Loading  script ${file} ... `);
    runSQLFile(file,config)
    process.stdout.write(`Done!!!\n`);
}
