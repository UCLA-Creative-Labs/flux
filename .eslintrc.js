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
overrides:[
{
files: ["*.js","*.jsx"],
rules:{
"jsx-a11y/click-events-have-key-events":"off"
}
}
]
};
