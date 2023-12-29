module.exports = {
    // ... other Webpack configuration
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        // ... other rules
      ],
    },
  };