module.exports = {
  parser: "babel-eslint",
  extends: [
    "eslint:recommended",
    "airbnb",
    "plugin:prettier/recommended",
    "prettier/react"
  ],
  env: {
    browser: true,
    node: true
  },
  overrides: [
    {
      files: ["*.js", "*.jsx"],
      rules: {
        "jsx-a11y/interactive-supports-focus": "off",
        "jsx-a11y/no-static-element-interactions": "off"
      }
    }
  ]
};
