import { join as joinPath } from 'path'
import { IQueryFileOptions, QueryFile } from 'pg-promise';

export const sql = (file: string): QueryFile => {
    const fullPath: string = joinPath(__dirname, 'repositories', file);

    const options: IQueryFileOptions = {
        debug: process.env.NODE_ENV === 'development',
        minify: true,
    };

    const qf: QueryFile = new QueryFile(fullPath, options);

    if(qf.error) {
        console.log(`Error occured loading QueryFile ${file}`);
        console.log(qf.error);
    }

    return qf;

}