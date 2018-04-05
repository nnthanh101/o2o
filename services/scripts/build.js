import cpr from "child_process"
import fse from "fs-extra"
import path from "path"

const _ = console.log
const projectPath = path.join(__dirname, "..")
const srcPath = path.join(projectPath, "src")
const distPath = path.join(projectPath, "dist")

const runBuild = () => {
  _("[INFO] Cp src")
  fse.copySync(srcPath, distPath)

  _("[INFO] Run build")
  const buildCmd = `babel ${srcPath} --out-dir=${distPath}`
  const buildLog = cpr.execSync(buildCmd).toString()
  _(buildLog)
}

runBuild()
