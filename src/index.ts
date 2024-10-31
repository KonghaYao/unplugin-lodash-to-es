import { Plugin } from "vite";
import * as lodashModule from "lodash-es";
const allowKeys = Object.keys(lodashModule);
export const LodashToEs = (options?: {
    /** 强制打包进模块 */
    forceIncludeFns?: string[];
    excludes?: RegExp[];
}): Plugin => {
    console.log("lodash 插件启动");
    const vId = "virtual:lodash";
    const excludes = options?.excludes ?? [/node_modules/];
    const used = new Set<string>();
    return {
        name: "lodash-to-es",
        resolveId(id) {
            if (id === vId) return id;
        },
        transform(code, id, options) {
            if (excludes.some((i) => i.test(id))) return;
            const hasLodash = /lodash/;
            if (hasLodash.test(code)) {
                const regex = /\.chain\([\s\S]*?\)([\s\S]*?)\.value\(\)/g;
                const chainPart = getRegExpMatch(code, regex);
                if (chainPart.length) console.warn("发现 lodash.chain, 请处理 ", id);
                chainPart.forEach((res) => {
                    if (res[1]) {
                        getRegExpMatch(res[1], /\.(\w+)\([\s\S]*?\)/g).forEach((i) => {
                            used.add(i[1]);
                        });
                    }
                });

                const importName = getRegExpMatch(code, /import(.*?)from\s+['"]lodash['"]/g)
                    .map((i) => i[1])
                    .filter(Boolean)
                    .map((i) => i.trim())
                    .filter((i) => {
                        return !i.startsWith("{");
                    });
                const defaultExportNames = [...importName, "_", "lodash"];
                for (const name of defaultExportNames) {
                    const keys: string[] = code.match(new RegExp(`${name}\\.(\\w+)`, "g")) ?? [];
                    keys.forEach((res) => {
                        used.add(res.split(".")[1]);
                    });
                }
                return (
                    code
                        .replace(/(import(.*?)from )['"]lodash['"]/g, `$1"${vId}"`)
                        // import isEqual from 'lodash/isEqual';
                        .replace(/(import(.*?)from )['"]lodash\/(\w+)['"]/g, `import {$3 as  $2} from "${vId}"`)
                );
            }
        },
        load(id) {
            if (id === vId) {
                console.log(used)
                used.add("mixin");
                used.add("value");
                if (options?.forceIncludeFns) {
                    options.forceIncludeFns.forEach((i) => used.add(i));
                }
                const allow = [...used].filter((i) => allowKeys.includes(i));
                return `
export * from 'lodash-es';
import { ${allow.join(",")} } from 'lodash-es';
import _ from 'lodash-es/wrapperLodash.js';
mixin(_, { ${allow.filter((i) => i !== "value").join(",")} });
// 必须这样混入 value 字段
_.prototype.value = value;
export default _;
`;
            }
        },
    };
};

export const getRegExpMatch = (code: string, regex: RegExp) => {
    let match;
    let result: string[][] = [];
    while ((match = regex.exec(code)) !== null) {
        const res = match;
        if (res) result.push(res); // 输出匹配的第二个部分
    }
    return result;
};
