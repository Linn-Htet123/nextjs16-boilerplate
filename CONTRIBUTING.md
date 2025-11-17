# Contributing Guidelines

## Table of Contents

- [Code Quality Rules](#code-quality-rules)
- [Commit Message Format](#commit-message-format)
- [Pre-commit Checks](#pre-commit-checks)
- [Pre-push Checks](#pre-push-checks)

---

## Code Quality Rules

### 🚫 console.log is Forbidden

**Rule:** `no-console` - ERROR level

❌ **These will fail the commit:**

```typescript
console.log("debug message");
console.log(data);
console.table(users);
console.debug("test");
```

✅ **Use these instead:**

```typescript
console.warn("Warning: API rate limit approaching");
console.error("Error: Failed to fetch user data");
console.info("Info: User logged in successfully");
```

**Why?** `console.log` statements often contain debug code that shouldn't reach production. Use proper logging levels or remove them before committing.

---

### 🧹 No Unused Imports or Variables

**Rule:** `@typescript-eslint/no-unused-vars` - ERROR level

❌ **These will fail the commit:**

```typescript
import { useState, useEffect } from "react"; // useEffect not used
import axios from "axios"; // axios not used

function MyComponent() {
  const [count, setCount] = useState(0);
  const unusedVariable = "test"; // never used

  return <div>{count}</div>;
}
```

✅ **Fixed version:**

```typescript
import { useState } from "react";

function MyComponent() {
  const [count, setCount] = useState(0);

  return <div>{count}</div>;
}
```

✅ **Exception - prefix with underscore:**

```typescript
function handleClick(_event: MouseEvent) {
  // _event is intentionally unused but required by type
  console.info("Clicked!");
}

const [_loading, setLoading] = useState(false);
// _loading is unused but part of state hook
```

**Why?** Unused imports bloat bundle size and unused variables indicate dead code.

---

### 🔧 TypeScript Strict Rules

**Rule:** `@typescript-eslint/no-explicit-any` - WARNING level

⚠️ **These will show warnings:**

```typescript
function processData(data: any) {
  // ⚠️ Warning
  return data;
}

const items: any[] = []; // ⚠️ Warning
```

✅ **Better approach:**

```typescript
interface UserData {
  id: string;
  name: string;
  email: string;
}

function processData(data: UserData) {
  return data;
}

const items: UserData[] = [];
```

**Why?** Using `any` defeats the purpose of TypeScript and can hide bugs.

---

### ⚛️ React Hooks Rules

**Rule:** `react-hooks/rules-of-hooks` - ERROR level

❌ **These will fail:**

```typescript
function MyComponent() {
  if (condition) {
    const [state, setState] = useState(0); // ❌ Conditional hook
  }

  for (let i = 0; i < 10; i++) {
    useEffect(() => {}); // ❌ Hook in loop
  }
}
```

✅ **Correct usage:**

```typescript
function MyComponent() {
  const [state, setState] = useState(0);

  useEffect(() => {
    if (condition) {
      // Conditional logic inside hook
    }
  }, [condition]);
}
```

---

## Commit Message Format

### 📝 Commit Message Structure

**Format:** `type: [TICKET-NUMBER] description`

**Rules:**

- Type must be lowercase
- Space required after colon `:`
- Ticket number is optional but must follow format `[PREFIX-123]` or `[PREFIX]`
- Description is required
- Maximum header length: 100 characters

---

### ✅ Valid Commit Examples

```bash
# With ticket number
git commit -m "feat: [LOM-154] Add user authentication"
git commit -m "fix: [JIRA-789] Resolve memory leak in cache"
git commit -m "chore: [TASK-42] Update dependencies"

# Without ticket number (also valid)
git commit -m "docs: Update README with setup instructions"
git commit -m "fix: Resolve typo in error message"
git commit -m "style: Format code with prettier"

# With prefix only (no number)
git commit -m "feat: [LOM] Add new dashboard widget"
git commit -m "refactor: [CORE] Simplify API client"
```

---

### ❌ Invalid Commit Examples & Error Messages

#### 1. Missing type

```bash
git commit -m "updated code"
```

**Error:**

```
⧗   input: updated code
✖   subject may not be empty [subject-empty]
✖   type may not be empty [type-empty]

✖   found 2 problems, 0 warnings
ⓘ   Get help: https://github.com/conventional-changelog/commitlint/#what-is-commitlint
```

---

#### 2. Wrong case (uppercase type)

```bash
git commit -m "FEAT: add feature"
```

**Error:**

```
⧗   input: FEAT: add feature
✖   type must be lower-case [type-case]

✖   found 1 problems, 0 warnings
ⓘ   Get help: https://github.com/conventional-changelog/commitlint/#what-is-commitlint
```

---

#### 3. Missing space after colon

```bash
git commit -m "fix:missing space"
```

**Error:**

```
⧗   input: fix:missing space
✖   subject may not be empty [subject-empty]

✖   found 1 problems, 0 warnings
ⓘ   Get help: https://github.com/conventional-changelog/commitlint/#what-is-commitlint
```

---

#### 4. Invalid type

```bash
git commit -m "update: change something"
```

**Error:**

```
⧗   input: update: change something
✖   type must be one of [feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert] [type-enum]

✖   found 1 problems, 0 warnings
ⓘ   Get help: https://github.com/conventional-changelog/commitlint/#what-is-commitlint
```

---

#### 5. Too long (over 100 characters)

```bash
git commit -m "feat: [LOM-123] This is a very long commit message that exceeds the maximum allowed length of one hundred characters"
```

**Error:**

```
⧗   input: feat: [LOM-123] This is a very long commit message that exceeds the maximum allowed length of one hundred characters
✖   header must not be longer than 100 characters, current length is 125 [header-max-length]

✖   found 1 problems, 0 warnings
ⓘ   Get help: https://github.com/conventional-changelog/commitlint/#what-is-commitlint
```

---

#### 6. Empty subject

```bash
git commit -m "feat: [LOM-123]"
```

**Error:**

```
⧗   input: feat: [LOM-123]
✖   subject may not be empty [subject-empty]

✖   found 1 problems, 0 warnings
ⓘ   Get help: https://github.com/conventional-changelog/commitlint/#what-is-commitlint
```

---

### 📋 Available Commit Types

| Type       | Description                                             | Example                                   |
| ---------- | ------------------------------------------------------- | ----------------------------------------- |
| `feat`     | A new feature                                           | `feat: [LOM-154] Add user login`          |
| `fix`      | A bug fix                                               | `fix: [LOM-155] Resolve crash on startup` |
| `docs`     | Documentation only changes                              | `docs: Update API documentation`          |
| `style`    | Formatting, missing semi-colons, etc                    | `style: Format with prettier`             |
| `refactor` | Code change that neither fixes a bug nor adds a feature | `refactor: Simplify auth logic`           |
| `perf`     | Performance improvements                                | `perf: Optimize image loading`            |
| `test`     | Adding or correcting tests                              | `test: Add unit tests for utils`          |
| `build`    | Changes to build system or dependencies                 | `build: Update webpack config`            |
| `ci`       | Changes to CI configuration                             | `ci: Add GitHub Actions workflow`         |
| `chore`    | Other changes that don't modify src or test files       | `chore: Update .gitignore`                |
| `revert`   | Reverts a previous commit                               | `revert: Revert "feat: Add feature"`      |

---

## Pre-commit Checks

When you run `git commit`, the following checks run automatically:

### ✨ Lint-staged Actions

1. **For `.js`, `.jsx`, `.ts`, `.tsx` files:**
   - ✅ ESLint auto-fix
   - ✅ Prettier formatting
   - ❌ Blocks commit if unfixable errors exist

2. **For `.json`, `.css`, `.md` files:**
   - ✅ Prettier formatting

### 🔍 What Gets Checked

- ❌ `console.log` statements
- ❌ Unused imports
- ❌ Unused variables
- ❌ Code style violations
- ❌ TypeScript errors (if auto-fixable)

### Example Pre-commit Flow

```bash
git add src/utils.ts
git commit -m "feat: Add utility function"

# Output:
✔ Preparing lint-staged...
✔ Running tasks for staged files...
  ✔ src/utils.ts
    ✔ eslint --fix
    ✔ prettier --write
✔ Applying modifications from tasks...
✔ Cleaning up temporary files...

✔ Checking commit message...
[main abc1234] feat: Add utility function
 1 file changed, 10 insertions(+)
```

**If errors found:**

```bash
git commit -m "feat: Add utility function"

# Output:
✖ Running tasks for staged files...
  ✖ src/utils.ts
    ✖ eslint --fix

      /path/to/src/utils.ts
        5:3  error  Unexpected console statement  no-console

✖ 1 problem (1 error, 0 warnings)

✖ lint-staged failed. Commit aborted.
```

---

## Pre-push Checks

When you run `git push`, type checking runs automatically:

```bash
git push origin main

# Output:
Running type-check...
✔ Type checking passed

Enumerating objects: 5, done.
Counting objects: 100% (5/5), done.
```

**If type errors found:**

```bash
git push origin main

# Output:
Running type-check...

src/components/Button.tsx:12:5 - error TS2322: Type 'string' is not assignable to type 'number'.

12     count={count}
       ~~~~~

✖ Type check failed. Push aborted.
```

---

## Bypassing Checks (Not Recommended)

### Skip pre-commit hooks:

```bash
git commit --no-verify -m "feat: Emergency fix"
```

### Skip pre-push hooks:

```bash
git push --no-verify
```

⚠️ **Warning:** Only use `--no-verify` in emergencies. Your code will still be checked by CI/CD.

---

## Quick Reference

### Fix Common Issues

**Remove all `console.log`:**

```bash
npm run lint:fix
```

**Check types before pushing:**

```bash
npm run type-check
```

**Format all files:**

```bash
npm run format
```

**Manual lint check:**

```bash
npm run lint
```

---

## Getting Help

- ESLint errors: Check the [ESLint rules documentation](https://eslint.org/docs/rules/)
- Commit format: See examples above
- TypeScript errors: Run `npm run type-check` for details

For questions, contact the development team or check our internal wiki.
