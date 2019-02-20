import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import resolve from 'rollup-plugin-node-resolve'
import pkg from './package.json'

export default [
  {
    input: 'src/index.ts',
    output: {
      file: pkg.module,
      format: 'esm',
      sourcemap: true
    },
    plugins: [
      babel({ extensions: ['.js', '.ts', '.tsx'] }),
      resolve({ extensions: ['.js', '.ts', '.tsx'] }),
      external(),
      commonjs(),
      postcss()
    ]
  },
  {
    input: 'src/index.ts',
    output: {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true
    },
    plugins: [
      babel({ extensions: ['.js', '.ts', '.tsx'] }),
      resolve({ extensions: ['.js', '.ts', '.tsx'] }),
      external(),
      commonjs(),
      postcss()
    ]
  },
  {
    input: 'src/index.ts',
    output: {
      file: pkg.unpack,
      format: 'umd',
      name: 'ReactHeroForm',
      sourcemap: true,
      globals: {
        react: 'React'
      }
    },
    plugins: [
      babel({ extensions: ['.js', '.ts', '.tsx'] }),
      resolve({ extensions: ['.js', '.ts', '.tsx'] }),
      external(),
      commonjs(),
      postcss()
    ]
  }
]
