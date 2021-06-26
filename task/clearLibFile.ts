import {TaskFunction} from "gulp";
import * as fse from 'fs-extra'
import {log, paths} from "./config";

export const clearLibFile: TaskFunction = async (cb) => {
  fse.removeSync(paths.lib)
  log.progress('Deleted lib file')
  cb();
}
