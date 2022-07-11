const { resolve } = require('path')
const { readFile, writeFile } = require('fs')
const { template } = require('lodash')
const { config } = require('dotenv')

const templatePath = resolve(__dirname, 'template', 'site.config.hbs')
const configPath = resolve(process.cwd(), 'src', 'app.config.json')

readFile(templatePath, (err, data) => {
  if (err) {
    process.exitCode = 1
    console.error(err.message)
  } else {
    try {
      let result = '{}'
      config()
      const compile = template(data.toString())

      if (process.env !== 'development') {
        result = compile({
          ...process.env,
        })
      }

      writeFile(configPath, Buffer.from(result), (e) => {
        if (e) {
          process.exitCode = 1
          console.error(e.message)
        } else {
          console.info('Complete', configPath)
        }
      })
    } catch (e) {
      process.exitCode = 1
      console.error(e.message)
    }
  }
})
