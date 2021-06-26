import {TaskFunction} from "gulp";
import rollupConfig from '../rollup.config'
import {log} from "./config";
import {rollup} from "rollup";

export const buildByRollup: TaskFunction = async (cb) => {
  const inputOptions = {
    input: rollupConfig.input,
    external: rollupConfig.external,
    plugins: rollupConfig.plugins,
  }
  const outOptions = rollupConfig.output
  const bundle = await rollup(inputOptions)

  // 写入需要遍历输出配置
  if (Array.isArray(outOptions)) {
    outOptions.forEach(async (outOption) => {
      await bundle.write(outOption)
      return false
    })
    cb()
    log.progress('Rollup built successfully')
  } else {
    cb()
  }

}
