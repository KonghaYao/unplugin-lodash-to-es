import { defineConfig } from "vite";
import { LodashToEs } from "./src";
import { nodeExternals } from "rollup-plugin-node-externals";
export default defineConfig({
    plugins: [
        // nodeExternals({
        //     devDeps: true,
        // }),
        LodashToEs(),
    ],
    build: {
        target: "esnext",
        minify: false,
        lib: {
            entry: "./test/example.js",
            name: "lodash-to-es",
            fileName: "lodash-to-es",
            formats: ["es"],
        },
    },
});
