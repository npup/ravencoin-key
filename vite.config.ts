import path from "path";
import * as url from "url";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { nodePolyfills } from "vite-plugin-node-polyfills";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const libName = "ravencoinKey";

export default defineConfig({
    build: {
        sourcemap: true,
        minify: true,
        lib: {
            formats: ["es", "umd"],
            entry: path.resolve(__dirname, "src/index.ts"),
            name: libName,
            fileName: (format) => {
                switch (format) {
                    case "es":
                        return `index.js`;
                    case "umd":
                        return `index.umd.cjs`;
                }
                throw Error(`Konstigt modulformat: ${format}`);
            },
        },
    },
    plugins: [
        dts({
            insertTypesEntry: true,
            entryRoot: "./src",
        }),
        nodePolyfills({
            protocolImports: true,
        }),
    ],
});
