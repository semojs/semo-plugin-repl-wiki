import * as baidu from '../common/baidu'

export = (Utils) => {
  return {
    hook_repl_command: new Utils.Hook('semo', () => {
      return {
        wiki: {
          help: 'Get information from wiki websites',
          async action(input) {
            if (!input) {
              Utils.warn('keyword is required')
            } else {
              let parseInput = Utils.yParser(input)
              let words = parseInput._.join(' ')
              // @ts-ignore
              this.clearBufferedCommand()

              let wiki = await baidu.getWiki(words)
              const regexp = new RegExp(`(${words})`, 'ig')
              wiki = wiki.replace(regexp, (match, p1) => {
                return Utils.chalk.green(p1)
              })
              console.log(Utils.chalk.cyan(wiki))
              
              // @ts-ignore
              this.displayPrompt()
            }
          }
        }
      }
    })
  }
}