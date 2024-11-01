import { defineConfig } from "vite";
import vitePlugin from "./src/vite";
import { nodeExternals } from "rollup-plugin-node-externals";
import Inspect from "vite-plugin-inspect";
export default defineConfig({
    plugins: [
        nodeExternals({
            devDeps: true,
        }),
        vitePlugin(),
        Inspect({ build: true,}),
    ],
    build: {
        target: "esnext",
        minify: false,
        lib: {
            entry: ["./src/index.ts","./src/vite.ts"],
            name: "lodash-to-es",
            fileName: "lodash-to-es",
            formats: ["es"],
        },
    },
});
