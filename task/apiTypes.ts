// api-extractor 整理 .d.ts 文件
import {TaskFunction} from "gulp";
import {Extractor, ExtractorConfig, ExtractorResult} from "@microsoft/api-extractor";
import * as fse from 'fs-extra';
import {log, paths} from "./config";
const path = require('path');

export const apiTypes: TaskFunction = async (cb) => {
  const apiExtractorJsonPath: string = path.resolve(__dirname,'./config/api-extractor.json')
  console.log(apiExtractorJsonPath)
  // 加载并解析 api-extractor.json 文件
  const extractorConfig: ExtractorConfig = await ExtractorConfig.loadFileAndPrepare(apiExtractorJsonPath)

  // 判断是否存在 index.d.ts 文件，这里必须异步先访问一边，不然后面找不到会报错
  const isExist: boolean = await fse.pathExists(extractorConfig.mainEntryPointFilePath)
  if (!isExist) {
    log.error('API Extractor not find index.d.ts')
    return
  }

  // 调用 API
  const extractorResult: ExtractorResult = await Extractor.invoke(extractorConfig, {
    localBuild: true,
    // 在输出中显示信息
    showVerboseMessages: true,
  })

  if (extractorResult.succeeded) {
    // 删除多余的 .d.ts 文件
    const libFiles: string[] = await fse.readdir(paths.lib)
    libFiles.forEach(async file => {
      if (file.endsWith('.d.ts') && !file.includes('index')) {
        await fse.remove(path.join(paths.lib, file))
      }
    })
    log.progress('API Extractor completed successfully')
    cb()
  } else {
    log.error(`API Extractor completed with ${extractorResult.errorCount} errors`
      + ` and ${extractorResult.warningCount} warnings`)
  }

}
