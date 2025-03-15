module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Optional: if you want to use reanimated
      'react-native-reanimated/plugin',
    ],
  };
};