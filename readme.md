# 简介

这个是 midway 3.0 elasticsearch 组件 模块

## 安装依赖

```shell
$ npm i midway-elasticsearch --save
```

## 引入组件

首先，引入 组件，在 src/configuration.ts 中导入

```ts
import { Configuration } from '@midwayjs/decorator';
import * as elasticsearch from 'midway-elasticsearch';
import { join } from 'path';

@Configuration({
  imports: [
    // ...
    elasticsearch, // 导入 elasticsearch 组件
  ],
  importConfigs: [join(__dirname, 'config')],
})
export class ContainerLifeCycle {}
```

## 配置

单客户端配置

```ts
// src/config/config.default.ts
export default {
  // ...
  config.elasticsearch = {
    client: {
      node: {
        url: new URL('http://xxxx:1200'),
      },
      auth: {
        username: 'elastic',
        password: 'changeme',
      },
    },
  };
};
```

更多参数可以查看 [elasticsearch](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/client-connecting.html#client-usage) 文档。

## 使用

我们可以在任意的代码中注入使用。

```ts
import { Provide, Controller, Inject, Get } from '@midwayjs/decorator';
import { ElasticsearchService } from 'midway-elasticsearch';

@Provide()
export class UserService {
  @Inject()
  elasticsearchService: ElasticsearchService;

  //创建或更新索引中的文档,如果目标是索引并且文档已经存在，则请求更新文档并增加其版本
  async index() {
    await this.elasticsearchService.index({
      index: 'students',
      type: '_doc',
      body: {
        name: 'John Doe',
        age: 17,
        hobby: 'basketball',
      },
    });
  }

  // 返回匹配查询的结果
  async search() {
    await this.elasticsearchService.search({
      index: 'students',
      type: '_doc',
    });
  }

  // 使用脚本或部分文档更新文档。
  async update() {
    await this.elasticsearchService.update({
      index: 'students',
      type: '_doc',
      id: '1',
      body: {
        doc: {
          hobby: 'swimming',
        },
      },
    });
  }

  // 删除文档
  async del() {
    await this.elasticsearchService.delete({
      index: 'students',
      type: '_doc',
      id: '1',
    });
  }
}
```
