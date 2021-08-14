module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '@routes': './src/routes',
          '@screens': './src/screens',
          '@components': './src/components',
          '@images': './assets/images',
          '@utils': './src/utils',
        },
      },
    ],
  ],
}
