
const fs = require('fs')
const path = require('path')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const babel = require('@babel/core')

/**
 * 获取文件依赖和代码
 * @param {String} filename 文件名
 */
function getDepCode (filename) {
    const ast = genAst(filename)
    const dependencies = getDependencies(ast, filename)
    const code = genCodeFromAst(ast)
    return {
        filename,
        dependencies,
        code
    }
}

/**
 * 生成ast（抽象语法树）
 * @param {String}} filename 文件名
 */
function genAst (filename) {
    // 同步读取js内容
    const content = fs.readFileSync(filename, 'utf-8')
    // 通过@babel/parser生成ast
    const ast = parser.parse(content, {
        sourceType: 'module'
    })
    return ast
}

/**
 * 通过ast获取到文件的依赖
 * @param {Object} ast 抽象语法树
 */
function getDependencies (ast, filename) {
    // 获取入口文件的依赖
    // key: 引用路径
    // value: 文件被引用文件的真实路径
    const dependencies = {}
    traverse(ast, {
        // es6引用
        ImportDeclaration ({ node }) {
            // 获取文件路径
            const dirname = path.dirname(filename)
            // 获取文件名
            const newFile = './' + path.join(dirname, node.source.value)

            dependencies[node.source.value] = newFile
        },
        // commonjs引用
        enter (ctx) {
            if (ctx.isStringLiteral()) {
                // 判断字符串字面量是否被require调用
                if (ctx.parent.callee && ctx.parent.callee.name === 'require') {
                    // 判断下是否是文件类型
                    if (/^(([A-Z]:)?[\.]?[\\{1,2}/]?.*[\\{1,2}/])*(.+)\.(.+)/.test(ctx.node.value)) {
                        const dirname = path.dirname(filename)
                        const newFile = './' + path.join(dirname, ctx.node.value)
                        dependencies[ctx.node.value] = newFile
                    }
                }
            }
        }
    })
    return dependencies
}

/**
 * 将代码转换成es5
 * @param {Object} ast 抽象语法树
 */
function genCodeFromAst (ast) {
    const { code } = babel.transformFromAst(ast, null, {
        presets: ['@babel/preset-env']
    })
    return code
}

module.exports = getDepCode
