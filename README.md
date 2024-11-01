# lodash-to-es 插件
lodash-to-es 是一个用于将 lodash 转换为 lodash-es 的 Unplugin 插件。它可以帮助你在项目中使用 ES 模块版本的 lodash，从而获得更好的 Tree Shaking 支持。

## 安装
你可以使用 npm 或 yarn 安装这个插件：

```bash
npm install lodash-to-es --save-dev
```
或

```bash
yarn add lodash-to-es --dev
```
## 使用
在vite配置文件中引入并使用这个插件。可以在 vite.config.mjs 中这样配置：

```javascript
import { defineConfig } from 'vite';
import lodashToEs from 'lodash-to-es/vite';

export default defineConfig({
  plugins: [
    lodashToEs({
      excludes: [/node_modules/], // 可选，排除某些文件
      forceIncludeFns: ['debounce', 'throttle'] // 可选，强制包含某些 lodash 函数
    })
  ]
});
```
## 配置选项
lodash-to-es 插件支持以下配置选项：

excludes：一个正则表达式数组，用于排除某些文件。默认值为 [ /node_modules/ ]。
forceIncludeFns：一个字符串数组，用于强制包含某些 lodash 函数。
示例
假设你有以下代码：

```javascript
import _ from 'lodash';

const result = _.chain([1, 2, 3])
  .map(n => n * 2)
  .filter(n => n > 2)
  .value();

console.log(result);
```
使用 lodash-to-es 插件后，代码将被转换为：

```javascript
import _ from 'virtual:lodash';

const result = _.chain([1, 2, 3])
  .map(n => n * 2)
  .filter(n => n > 2)
  .value();

console.log(result);
```
插件会自动将 lodash 的导入替换为 virtual:lodash，并只导入实际使用到的 lodash 函数。

##注意事项
如果你的代码中使用了 lodash.chain，插件会发出警告，提示你手动处理链式调用。
插件会自动混入 value 函数，以确保链式调用能够正常工作。