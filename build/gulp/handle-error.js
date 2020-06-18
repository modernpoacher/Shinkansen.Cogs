import path from 'path'

import debug from 'debug'

import {
  currentDir
} from 'build/paths'

const log = debug('shinkansen-cogs:handle-error')

export function handleError ({
  code = 'No error code defined',
  message = 'No error message defined',
  filename: f,
  path: p
} = {}) {
  switch (code) {
    case 'EPERM':
      log(`A watched file or directory has invalid permissions: '${path.relative(currentDir, f || p)}'`)
      break

    case 'ENOENT':
      log(`A watched file or directory has been deleted: '${path.relative(currentDir, f || p)}'`)
      break

    default:
      log(`Watch error. ${code}: ${message}.`)
      break
  }
}

export default handleError