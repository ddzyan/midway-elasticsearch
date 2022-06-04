import { createLightApp } from '@midwayjs/mock';
import { assert } from 'console';
import { join } from 'path';
import { ElasticsearchService } from '../src';

describe('/test/index.test.ts', () => {
  it('test single client', async () => {
    const app = await createLightApp(
      join(__dirname, './fixtures/elasticsearch-demo')
    );
    const elasticsearchService = await app
      .getApplicationContext()
      .getAsync(ElasticsearchService);

    assert(await elasticsearchService.ping());
  });
});
