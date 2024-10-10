# vue-rabbit

## axios配置
![alt text](./readme_img/image.png)

## eslint+prettier
+ 禁用格式化插件prettier， format on save关闭
+ 安装Eslint插件，并在setting中配置保存时自动修复
```
"editor.codeActionsOnSave": {"source.fixAll":true },
```
+.eslintrc.cjs中对rules添加配置参考如下：
```
rules: {
    'prettier/prettier': [
      'warn',
      {
        singleQuote: true, // 单引号
        semi: false, // 无分号
        printWidth: 80, // 每行宽度至多80字符
        trailingComma: 'none', // 不加对象|数组最后逗号
        endOfLine: 'auto' // 换行符号不限制（win mac 不一致）
      }
    ],
  }
```
