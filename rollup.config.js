import { camelCase } from "lodash"
import path from "path"
import babel from "rollup-plugin-babel"
import commonjs from "rollup-plugin-commonjs"
import filesize from "rollup-plugin-filesize"
import json from "rollup-plugin-json"
import license from "rollup-plugin-license"
import resolve from "rollup-plugin-node-resolve"
import replace from "rollup-plugin-replace"
import { terser } from "rollup-plugin-terser"
import VuePlugin from "rollup-plugin-vue"
import postcss from "rollup-plugin-postcss"
import pfm from "postcss-font-magician"

import pack from "./package.json"

const projectName = "vuetify-form-generator"

// compute globals from dependencies
const globals =
  pack.dependencies &&
  Object.assign(
    {},
    ...Object.keys(pack.dependencies).map(key => ({
      [key]: camelCase(key)
    }))
  )

const builds = {
  // (CommonJS). Used by bundlers e.g. Webpack & Browserify
  cjs: {
    entry: "src/index.js",
    dest: `dist/${projectName}.common.js`,
    format: "cjs"
  },
  // (ES Modules). Used by bundlers that support ES Modules,
  // e.g. Rollup & Webpack 2
  esm: {
    entry: "src/index.js",
    dest: `dist/${projectName}.esm.js`,
    format: "es"
  },
  // build (Browser)
  "umd-dev": {
    entry: "src/index.umd.js",
    dest: `dist/${projectName}.js`,
    format: "umd",
    env: "development"
  },
  // production build (Browser)
  "umd-prod": {
    entry: "src/index.umd.js",
    dest: `dist/${projectName}.min.js`,
    format: "umd",
    env: "production"
  }
}

function genConfig(name) {
  const opts = builds[name]
  const config = {
    input: opts.entry,
    external: id => pack.dependencies && pack.dependencies[id], // exclude dependencies from build
    plugins: [
      resolve({
        browser: true,
        jsnext: true,
        preferBuiltins: false,
        extensions: [".js", ".json", ".vue"]
      }),
      commonjs(),
      VuePlugin({
        compileTemplate: true,
        // styleToImports: true,
        css: false,
        template: {
          // styleToImports: true,
          isProduction: opts.env === "production",
          compilerOptions: { preserveWhitespace: false }
        }
      }),
      postcss({
        plugins: [pfm()]
      }),
      json(),
      babel({
        exclude: "node_modules/**",
        runtimeHelpers: true
      }),
      filesize()
    ].concat(opts.plugins || []),
    output: {
      exports: "named",
      file: opts.dest,
      format: opts.format,
      // define globals in window from external dependencies
      globals,
      name: opts.moduleName || projectName
    }
  }

  if (opts.env) {
    config.plugins.push(
      replace({
        "process.env.NODE_ENV": JSON.stringify(opts.env)
      })
    )

    // minify on production targets
    if (opts.env === "production") {
      config.plugins.push(terser({}))
    }
  }

  // output a license to builds
  config.plugins.push(
    license({
      sourceMap: true,
      banner: {
        file: path.resolve("LICENSE.md")
      }
    })
  )

  Object.defineProperty(config, "_name", {
    enumerable: false,
    value: name
  })

  return config
}

const target = process.env.TARGET || "umd-prod"
module.exports = genConfig(target)
