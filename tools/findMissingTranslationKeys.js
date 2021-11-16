// HOW TO USE
// node .\tools\findMissingTranslationKeys.js --template en/common.json --toCompare de/common.json

const getFilePaths = () => {
  const argsArray = process.argv.slice(2)
  const templateParamName = '--template'
  const toCompareParamName = '--toCompare'

  if (
    !argsArray.includes(templateParamName) ||
    !argsArray.includes(toCompareParamName) ||
    argsArray.length < 4
  )
    throw new Error(`Arguments ${templateParamName} and ${toCompareParamName} must be provided.`)

  const template = argsArray[argsArray.indexOf(templateParamName) + 1]
  const toCompare = argsArray[argsArray.indexOf(toCompareParamName) + 1]
  return { template, toCompare }
}

const getTranslationKeys = json => {
  const keys = []

  const getTranslationKeysInner = (json, prefix = '') => {
    const entries = Object.entries(json)

    for (let [key, value] of entries) {
      if (typeof value === 'string') {
        let item = `${prefix}.${key}`
        if (item[0] === '.') item = item.slice(1)
        keys.push(item)
        continue
      }

      getTranslationKeysInner(value, `${prefix}.${key}`)
    }
  }

  getTranslationKeysInner(json)
  return keys
}

const filePaths = getFilePaths()
const template = require('../locales/' + filePaths.template)
const toBeCompared = require('../locales/' + filePaths.toCompare)

const templateKeys = getTranslationKeys(template)
const keysToBeCompared = getTranslationKeys(toBeCompared)
const missingKeys = templateKeys.filter(x => keysToBeCompared.every(y => y !== x))

const fs = require('fs')
fs.writeFile(
  './tools/missingKeysReuslt.txt',
  `Missing keys in ${filePaths.toCompare} compared to ${filePaths.template}:

  ${JSON.stringify(missingKeys, null, 4)}`,
  console.log
)
