const spawn = require("cross-spawn")
const path = require("path")

// Const
const projectPath = path.join(__dirname, "..")
const servicesDir = path.join(projectPath, "services")
const initDataDir = path.join(projectPath, "scripts", "init-data")
const mnemonic = process.env.MNEMONIC || "guide box joke increase brown kick avoid toe wedding sure swift seek"
const ganacheCli = path.join(projectPath, "node_modules", "ganache-cli", "build", "cli.node.js")

// Support functions

const log = (...args) => console.log("\x1b[36m%s\x1b[0m", ...args)

/**
 * Delay as promise
 * @param time
 * @returns {Promise<any>}
 */
const delay = time => new Promise(resolve => setTimeout(resolve, time))

/**
 * Simple spawn child process & pipe its log to main process
 * @param cmd
 * @param args
 * @param options
 */
const iSpawn = (cmd, args, options = {}) => spawn(cmd, args, { stdio: "inherit", ...options })

const throwException = err => {
  const isBuffer = err instanceof Buffer
  const errMsg = isBuffer ? err.toString() : err.message
  console.log("[errMsg]", errMsg)
  throw new Error("Hit exception")
}

/**
 * Spawn child process & watch it log
 * @param cmd
 * @param args
 * @param options
 * @param cbStdOut
 * @param cbStdErr
 */
const watchLogSpawn = (cmd, args, options = {}, cbStdOut, cbStdErr = throwException) => {
  // cpr: Child Process
  const cpr = spawn(cmd, args, options)
  cbStdOut && cpr.stdout.on("data", cbStdOut)
  cbStdErr && cpr.stderr.on("data", cbStdErr)
}

const runPrivateChain = (cbStdOut, cbStdErr) => {
  log("[INFO] RUN PRIVATE CHAIN")
  watchLogSpawn("node", [ganacheCli, "-p=8545", "-e=99", `-m="${mnemonic}"`], {}, cbStdOut, cbStdErr)
}

const deploySmartContract = (cbStdOut, cdStdErr) => {
  log("[INFO] DEPLOY SMART CONTRACT")
  watchLogSpawn("npm", ["run", "migrate:development"], {}, cbStdOut, cdStdErr)
}

const buildServices = (cbStdOut, cdStdErr) => {
  log("[INFO] BUILD SERVICES")
  spawn.sync("npm", ["install"], { stdio: "inherit", cwd: servicesDir })
  watchLogSpawn("npm", ["run", "build"], { cwd: servicesDir }, cbStdOut, cdStdErr)
}

/**
 * Simple increase semantic version
 * @param cbStdOut
 * @param cdStdErr
 */
const publishServices = (cbStdOut, cdStdErr) => {
  log("[INFO] PUBLISH SERVICES")
  // const packagePath = path.join(servicesDir, "package.json")
  // const packageObj = require(packagePath)
  // const currVerion = packageObj.version
  // const newVersion = increaseVersion(currVerion)
  // watchLogSpawn("npm", ["publish", "--new-version", newVersion], { cwd: servicesDir }, cbStdOut, cdStdErr)
  watchLogSpawn("npm", ["publish"], { cwd: servicesDir }, cbStdOut, cdStdErr)
}

const increaseVersion = semanticVersion => {
  try {
    const matches = semanticVersion.match(/(\d+).(\d+).(\d+)/)

    // Sample matches: ["1.4.5", "1", "4", "5", index: 0,...]
    const [, major, mirror, patch] = matches
    const newPatch = +patch + 1
    const newVersion = `${major}.${mirror}.${newPatch}`
    return newVersion
  } catch (err) {
    console.log("[ERR]", err.message)
    throw new Error("Fail to increase semantic version")
  }
}

const initData = (cbStdOut, cdStdErr) => {
  log("[INFO] INIT DATA")
  spawn.sync("npm", ["install"], { stdio: "inherit", cwd: initDataDir })
  watchLogSpawn("node", ["index.js"], { cwd: initDataDir }, cbStdOut, cdStdErr)
}

/**
 * Run Dev Server task:
 * + Run private blockchain
 * + Deploy smart contract
 * + Publish o2oprotocol in "services" dir
 */
const runDevServer = () => {
  const waitRun = new Promise(resolve => {
    runPrivateChain(data => {
      const msg = data.toString()
      console.log(msg)
      const isCompleted = msg.includes("Listening on")
      isCompleted && resolve(isCompleted)
    })
  })

  const waitDeploy = waitRun.then(() => {
    return new Promise(resolve => {
      deploySmartContract(data => {
        const msg = data.toString()
        console.log(msg)
        const isDeployed = msg.includes("[ABI]")
        isDeployed && resolve(isDeployed)
      })
    })
  })

  const waitBuild = waitDeploy.then(() => {
    return new Promise(resolve => {
      buildServices(data => {
        const msg = data.toString()
        console.log(msg)
        const isBuilt = msg.includes("Hash")
        isBuilt && resolve(isBuilt)
      })
    })
  })

  const waitPublish = waitBuild.then(() => {
    // return Promise.resolve()
    return new Promise(resolve => {
      publishServices(data => {
        const msg = data.toString()
        console.log(msg)
        // const isPublished = msg.includes("Done")
        const isPublished = msg.includes("o2oprotocol@")
        isPublished && resolve(isPublished)
      })
    })
  })

  const waitInitData = waitPublish.then(() => {
    return new Promise(resolve => {
      initData(data => {
        const msg = data.toString()
        console.log(msg)
        const isFinished = msg.includes("Init data finished")
        isFinished && resolve(isFinished)
      })
    })
  })

  waitInitData.then(() => console.log("[INFO] Finished."))
}

runDevServer()
