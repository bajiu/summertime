import {log} from "./task/config";
import {TaskFunction, task, series} from "gulp";
import {clearLibFile} from "./task/clearLibFile";
import {buildByRollup} from "./task/buildByRollup";
import {apiTypes} from "./task/apiTypes"

// 完成
const complete: TaskFunction = (cb) => {
  log.progress('---- end ----')
  cb()
}




task("build", series(clearLibFile, buildByRollup, apiTypes, complete))
