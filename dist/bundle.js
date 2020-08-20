
        ;(function (modules) {
            function require (filename) {
                function innerRequire (relativePath) {
                    return require(modules[filename].dependencies[relativePath])
                }

                var module = { exports: {} }
                ;(function (require, module, exports, code) {
                    eval(code)
                })(innerRequire, module, module.exports, modules[filename].code)
                console.error(module.exports)
                return module.exports
            }

            require('./main.js')
        })({"./main.js":{"dependencies":{"./src/main.js":"./src/main.js","./src/test.js":"./src/test.js"},"code":"\"use strict\";\n\nvar _main = _interopRequireDefault(require(\"./src/main.js\"));\n\nvar _test = _interopRequireDefault(require(\"./src/test.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\n// const Bind = require('./src/main.js')\n// const Test = require('./src/test.js')\nconsole.error(_main[\"default\"]);\nconsole.error(_test[\"default\"]);\nexports.Bind = _main[\"default\"];\nexports.Test = _test[\"default\"];"},"./src/main.js":{"dependencies":{"./hello.js":"./src/hello.js"},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\n\n// import { name } from './hello'\nvar hello = require('./hello.js');\n\nvar a = 'hello' + hello.name; // module.exports = a\n\nvar _default = a;\nexports[\"default\"] = _default;"},"./src/test.js":{"dependencies":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar Test = /*#__PURE__*/function () {\n  function Test() {\n    _classCallCheck(this, Test);\n  }\n\n  _createClass(Test, [{\n    key: \"report\",\n    value: function report() {\n      console.error(132);\n    }\n  }]);\n\n  return Test;\n}(); // module.exports = Test\n\n\nvar _default = Test;\nexports[\"default\"] = _default;"},"./src/hello.js":{"dependencies":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.name = void 0;\nvar name = 'world'; // exports.name = name\n\nexports.name = name;"}})
    