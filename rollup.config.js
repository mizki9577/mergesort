import progress from 'rollup-plugin-progress'
import replace from 'rollup-plugin-replace'
import serve from 'rollup-plugin-serve'

export default {
  entry: 'src/main.js',
  dest: 'public/bundle.js',
  format: 'es',

  plugins: [
    progress(),

    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),

    serve({
      contentBase: 'public',
    }),
  ],
}

// vim: set ts=2 sw=2 et:
