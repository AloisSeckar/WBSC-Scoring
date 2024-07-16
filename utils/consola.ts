// #215 - centralized logging system
// https://github.com/unjs/consola

import type { LogLevel, LogObject } from 'consola'
import { LogLevels, consola, createConsola } from 'consola'

// default instance to write into browser's console
const defaultReporter = consola

/**
 * Logging object that is available across the app thanks to Nuxt auto-imports.
 */
export const log = createConsola({
  level: LogLevels.debug,
  reporters: [
    {
      log: (logObj) => {
        // enhancing log with more info (i.e. time + relevant stack for warn/error)
        const msg = transformLog(logObj)
        if (import.meta.dev) {
          // in DEV mode logs are being written into browser's console
          // `logObj.type` = log level name = corresponing method on the logger (debug, info, warn, error, etc.)
          defaultReporter[logObj.type](msg)
        } else {
          // TODO production logs - yet to be decided
          // defaultReporter[logObj.type](msg) // logging into browser's console is disabled
        }
      },
    },
  ],
})

/**
 * Initialize logger functions.
 * Called in app.vue's setup.
 */
export async function initConsola() {
  // set default log level from config
  const logLevel = useRuntimeConfig().public.logLevel
  log.level = getLogLevel(logLevel)
  defaultReporter.level = log.level
  log.debug(`[consola] log level set to '${logLevel}'`)
}

/**
 * Transform text values of logLevel
 * to numeric equivalent used by consola.
 */
function getLogLevel(logLevel: string): LogLevel {
  const logLevelString = logLevel.toLocaleLowerCase()
  switch (logLevelString) {
    case 'fatal': return LogLevels.fatal
    case 'error': return LogLevels.error
    case 'warn': return LogLevels.warn
    case 'log': return LogLevels.log
    case 'info': return LogLevels.info
    case 'success': return LogLevels.success
    case 'debug': return LogLevels.debug
    case 'trace': return LogLevels.trace
    case 'silent': return LogLevels.silent
    case 'verbose': return LogLevels.verbose
    default: log.fatal(`Invalid log level ${logLevel}`)
      throw new Error(`Invalid log level ${logLevel}`)
  }
}

/**
 * Enhance received log object, which should be logged.
 * Add current date+time and trim irrelevant call-stack for warn/errors.
 * @param logObj Object to be logged
 * @returns Enhanced object to be logged
 */
function transformLog(logObj: LogObject): string {
  let logBody = logObj.args[0]
  if (typeof logBody !== 'string') {
    logBody = JSON.stringify(logBody)
  }

  const timestamp = useDateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss.SSS').value
  logBody = timestamp + '\n' + logBody

  if (logObj.level <= LogLevels.warn) {
    const fullStack = new Error(logBody).stack
    const filteredStack = fullStack?.split('\n    at ').filter(x => !x.includes('node_modules'))
    const relevantStack = filteredStack?.slice(0, filteredStack.length - 3)
    if (relevantStack?.length && logObj.level <= LogLevels.warn) {
      if (logObj.level === LogLevels.warn) {
        relevantStack[0] = relevantStack[0]!.replace('Error:', 'Warn:')
      }
      logBody = timestamp + '\n' + relevantStack.join('\n\tat ')
    }
  }

  return logBody
}
