const depCode = require('./depCode')

/**
 * 传入入口文件、获取文件所有依赖、生成依赖与文件的对应关系
 * @param {String}} entry 入口文件
 */
function depModule (entry) {
    const codeObj = depCode(entry)
    const depArr = getDeepDep(codeObj)
    const module = genModule(depArr)
    return module
}

/**
 * 循环获取所有依赖
 * @param {Object} depCode 入口依赖
 */
function getDeepDep (codeObj) {
    const depArr = new Array(1).fill(codeObj)
    for (let i = 0; i < depArr.length; i++) {
        // 拿到文件所依赖的模块集合, dependencies的值参考depCode
        const { dependencies } = depArr[i]
        for (const dep of Object.values(dependencies)) {
            // 将相关的模块push进depArr中
            depArr.push(depCode(dep))
        }
    }
    return depArr
}

/**
 * 获取文件和依赖、code的对应关系
 * @param {Array} depArr 文件中所有依赖的数组
 */
function genModule (depArr) {
    const obj = {}
    depArr.forEach(item => {
        obj[item.filename] = {
            dependencies: item.dependencies,
            code: item.code
        }
    })
    return obj
}

module.exports = depModule
