const production = (process.env.NODE_ENV === 'production');

require('esbuild')
  .build({
    entryPoints: [
      'src/index.js'
    ],
    outfile: (production ? 'dist/reading-bar.esm.min.js' : 'dev/bundle.js'),
    format: 'esm',
    bundle: true,
    minify: production,
    plugins: [
      require('esbuild-svelte')({
        compilerOptions: {
          css: true,
          customElement: true,
        },
        preprocess: require('svelte-preprocess')({
          postcss: {
            plugins: [
              require('autoprefixer')
            ]
          }
        })
      })
    ],
    watch: production ? false : {
      onRebuild(error) {
        if (!error) console.log('Successfully built!');
      }
    }
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
