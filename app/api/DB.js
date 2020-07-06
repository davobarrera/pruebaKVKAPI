import {runSQLFile} from '../util/sqlHelper.js'
import viewsAndProcedures from '../loaders/viewsAndProcedures.js';

export default function ({router,config}){
    router.get('/restore', restoreDB(config));

    return router;
}

function restoreDB(config) {
    return async (req, res) => {
        try{
            runSQLFile('/usr/scripts/0-reloadDB.sql',config);
            await viewsAndProcedures({config})
            res.json({ok:'ok'});
        }catch(err){
            console.error(err); 
            res.json({error: err.message});
        }
    }
} 