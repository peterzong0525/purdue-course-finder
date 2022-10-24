module.exports = {  
    transformIgnorePatterns: ['node_modules/(?!(axios)/)'],
    transform: {
      '^.+\\.(js|jsx|ts|tsx|mjs)$': 'babel-jest',
    },
    moduleNameMapper: {
        '\\.(css|less|PNG|png|svg)$': '<rootDir>/mock.js',
    }

  }