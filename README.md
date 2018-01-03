# 0_34_Match_Module_C

## 使用方法

### 开发环境

* [NODE.JS v6.11.1](https://nodejs.org/en/blog/release/v6.11.1/)

### 脚本命令

|`npm run <script>`|描述|
|------------------|-----------|
|`start`|在开发环境启动程序|
|`lint`|检查 JS 代码规范|

## 开发设计指南

### 页面代码结构

```javascript
var objectA = (function () {
  // dom fields
  var $domObjA = null
  ...

  // private fields
  var _fieldA = null
  ...

  // private methods
  function _cacheDOM() {
    $domObjA = $('#domObjA-id')
  }
  ...

  // public methods
  function init() {
    _cacheDOM()
    _fieldA = initalValue
    $domObjA.click(function () {
      // do something
    })
  }
  ...

  // expose public methods
  return {
    init: init,
    ...
  }
})()

...

$(document).ready(function() {
  objectA.init()
  ...
})
```

