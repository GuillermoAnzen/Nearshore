module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "node": true
    },
    //"extends": "eslint:recommended",
    "rules": {
        "indent": [
            "error",
            "tab"
        ],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "space-infix-ops": ["error", { "int32Hint": true }],
        "key-spacing": ["error", { "align": "colon" }]
    }
}