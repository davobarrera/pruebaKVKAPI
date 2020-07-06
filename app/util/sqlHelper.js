import { spawnSync } from 'child_process';

export const runSQLFile = function (file,config){
    const cmd = spawnSync( [
        'mysql', 
        `--defaults-extra-file=${config.db_config_file}`, 
        `${config.db_database}`,
        '<',
        file].join(' '), 
        {
            stdio: 'inherit',
            stdout: null,
            shell: true
        }
    );
}