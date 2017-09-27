## 使用

### example

```
npm install git+ssh://git@git.sdp.nd:social-xm/social-image-viewer.git#0.1.0 --save
```

或手工编辑 `package.json`

```
"dependencies": {¬                                                                                                                                                                                           
    "social-image-viewer": "git+ssh://git@git.sdp.nd:social-xm/social-image-viewer.git#0.1.0"¬
}¬
```

完整用法:

```
import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { ImageList, csUtils } from `social-image-viewer`

let images = [
    {
        imgSrc: 'http://betacs.101.com/v0.1/download?dentryId=0d510bfd-20e8-4546-965c-070cb3487339',
        imgSize80: 'http://betacs.101.com/v0.1/download?dentryId=0d510bfd-20e8-4546-965c-070cb3487339&size=80',
        imgSize160: 'http://betacs.101.com/v0.1/download?dentryId=0d510bfd-20e8-4546-965c-070cb3487339&size=160',
        imgSize240: 'http://betacs.101.com/v0.1/download?dentryId=0d510bfd-20e8-4546-965c-070cb3487339&size=240',
        imgSize320: 'http://betacs.101.com/v0.1/download?dentryId=0d510bfd-20e8-4546-965c-070cb3487339&size=320',
        imgSize480: 'http://betacs.101.com/v0.1/download?dentryId=0d510bfd-20e8-4546-965c-070cb3487339&size=480',
        imgSize640: 'http://betacs.101.com/v0.1/download?dentryId=0d510bfd-20e8-4546-965c-070cb3487339&size=640',
        imgSize960: 'http://betacs.101.com/v0.1/download?dentryId=0d510bfd-20e8-4546-965c-070cb3487339&size=960'
    }
]

let imageList =
    '3183c9d3-f7ca-427a-9deb-6741eb1a9a2f,' +
    '9d9ef7c8-3885-422b-9dae-354789fab2e8,' +
    '4c9d32b2-5a8a-4220-bd5c-bc518ccff78e,' +
    'f12cf9ad-273f-437e-88df-002b3ab799c8,' +
    '8b82abb7-c356-433b-9f59-9a99fec1e5cb'

let addition = {
    'imageSize':{
        '9d9ef7c8-3885-422b-9dae-354789fab2e8':{ 'width':600,'height':400 },
        '4c9d32b2-5a8a-4220-bd5c-bc518ccff78e':{ 'width':267,'height':570 },
        'f12cf9ad-273f-437e-88df-002b3ab799c8':{ 'width':389,'height':300 },
        '3183c9d3-f7ca-427a-9deb-6741eb1a9a2f':{ 'width':500,'height':354 },
        '8b82abb7-c356-433b-9f59-9a99fec1e5cb':{ 'width':1441,'height':960 }
    },
    '9d9ef7c8-3885-422b-9dae-354789fab2e8':'jpg',
    '4c9d32b2-5a8a-4220-bd5c-bc518ccff78e':'jpg',
    'f12cf9ad-273f-437e-88df-002b3ab799c8':'jpg',
    '3183c9d3-f7ca-427a-9deb-6741eb1a9a2f':'gif',
    '8b82abb7-c356-433b-9f59-9a99fec1e5cb':'jpg'
}

let imagesInfo = csUtils.getImagesByDentryId(imageList, addition)

render(
    <ImageList images={imagesInfo}/>,
    document.getElementById('root')
)

```

### 开发模式运行
```
npm start
```

### 编译
```
npm run build
```

### 测试及覆盖率
```
npm run test
npm run cover
```

### 组件配置说明
1. package.json 里要指明 main
1. webpack/production.config.js 里的输出路径要与 main 匹配
1. webpack/dev.config.js 配置的入口为示例文件的入口而不是 lib 的入口，要注意区分
1. webpack/dev.config.js 配置的入口为示例文件的入口而不是 lib 的入口，要注意区分
1. 注意 webpack 的 output 配置, 加了 `library` 和 `libraryTarget`
