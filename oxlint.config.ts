import { defineConfig } from "oxlint";

export const defaultPlugins = ["eslint", "typescript", "unicorn", "oxc"] as const;

export const baseConfig = defineConfig({
  categories: {
    correctness: "error",
    suspicious: "warn",
  },
  rules: {
    "eslint/no-shadow": "off",
    "typescript/array-type": ["error", { default: "generic" }],
    "react/react-in-jsx-scope": "off",
    "typescript/no-unsafe-type-assertion": "off",
    "typescript/consistent-type-imports": "error",
    "typescript/consistent-return": "off",
  },
  settings: {
    vitest: {
      typecheck: true,
    },
  },
  env: {
    builtin: true,
  },
  overrides: [
    {
      files: ["**/*.test.ts", "**/*.test.tsx"],
      plugins: [...defaultPlugins, "vitest"],
      rules: {
        "vitest/no-standalone-expect": [
          "error",
          {
            additionalTestBlockFunctions: ["it", "test"],
          },
        ],
      },
    },
  ],
});

export default defineConfig({
  extends: [baseConfig],
  options: {
    typeAware: true,
    reportUnusedDisableDirectives: "error",
  },
});
