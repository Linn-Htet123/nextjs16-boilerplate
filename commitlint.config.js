module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "docs",
        "style",
        "refactor",
        "perf",
        "test",
        "build",
        "ci",
        "chore",
        "revert",
      ],
    ],
    "type-case": [2, "always", "lower-case"],
    "type-empty": [2, "never"],
    "subject-empty": [2, "never"],
    "subject-case": [0],
    "header-max-length": [2, "always", 100],
    // Custom rule to check for ticket number format [XXXX-###]
    "subject-full-stop": [0],
    "body-leading-blank": [1, "always"],
    "footer-leading-blank": [1, "always"],
  },
  parserPreset: {
    parserOpts: {
      headerPattern: /^(\w+):\s*(\[[\w]+(?:-\d+)?\])?\s*(.+)$/,
      headerCorrespondence: ["type", "ticket", "subject"],
    },
  },
};

// Valid examples:

// feat: [LOM-154] Cache hotmatch list
// chore: [LOM-154] Mock hotmatch list
// fix: Fix typo in README (without ticket number)

// Invalid examples:

// updated code (no type)
// FEAT: add feature (wrong case)
// fix:missing space (missing space after colon)
