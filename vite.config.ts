import { defineConfig } from "vite-plus";

export default defineConfig({
  fmt: {
    semi: true,
    printWidth: 100,
    trailingComma: "all",
  },
  lint: {
    rules: {
      typescript: "warn",
      correctness: "warn",
      suspicious: "warn",
      perf: "warn",
    },
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  test: {
    globals: true,
    environment: "node",
    include: ["src/**/*.test.ts"],
    exclude: ["dist/**", "node_modules/**"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: ["dist/**", "node_modules/**", "**/*.config.ts", "src/cli.ts"],
    },
  },
  pack: {
    entry: ["src/**/*.ts", "!src/**/*.test.ts"],
    root: "src",
    platform: "node",
    target: "node24",
    format: ["esm"],
    fixedExtension: true,
    dts: true,
    clean: true,
    shims: true,
    sourcemap: true,
  },
  run: {
    tasks: {
      cli: {
        command: "node dist/cli.mjs",
        cache: false,
      },
      "test:integ": {
        command:
          "vp exec --filter test-cdk -- node --enable-source-maps --experimental-strip-types scripts/test-all.ts",
        cache: false,
      },
      "test:integ:basic": {
        command:
          "vp exec --filter test-cdk -- node --enable-source-maps --experimental-strip-types scripts/test-basic.ts",
        cache: false,
      },
      "test:integ:multiple": {
        command:
          "vp exec --filter test-cdk -- node --enable-source-maps --experimental-strip-types scripts/test-multiple.ts",
        cache: false,
      },
      "test:integ:keep-hours": {
        command:
          "vp exec --filter test-cdk -- node --enable-source-maps --experimental-strip-types scripts/test-keep-hours.ts",
        cache: false,
      },
    },
  },
  staged: {
    "*": "vp check --fix",
  },
});
