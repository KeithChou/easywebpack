const fs = require('fs')
const path = require('path')
const depModule = require('./depModule')

/**
 * 提供require、export等，生成闭包
 * @param {String} entry 入口文件
 */
function genBundle (entry) {
    // 注意这里要将对象转成字符串
    // 否则会被反引用解析成[object Object]
    const modules = JSON.stringify(depModule(entry))
    console.error(modules)
    writeIn(`
        ;(function (modules) {
            console.error(modules)
            function require (filename) {
                function innerRequire (relativePath) {
                    return require(modules[filename].dependencies[relativePath])
                }

                var module = { exports: {} }
                ;(function (require, module, exports, code) {
                    eval(code)
                })(innerRequire, module, module.exports, modules[filename].code)
                return module.exports
            }

            require('${entry}')
        })(${modules})
    `)
}

/**
 * @param {String} fn 闭包
 */
function writeIn (fn) {
    const directoryPath = path.resolve(__dirname, 'dist')
    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath)
    }
    const filename = path.resolve(__dirname, 'dist/bundle.js')
    fs.writeFileSync(filename, `${fn}`)
}

module.exports = genBundle
