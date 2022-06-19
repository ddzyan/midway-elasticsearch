import { IMidwayContainer } from '@midwayjs/core';
import { Configuration } from '@midwayjs/decorator';
import { ElasticsearchServiceFactory } from './manager';

@Configuration({
  namespace: 'elasticsearch',
})
export class ElasticsearchConfiguration {
  async onReady(container: IMidwayContainer) {
    await container.getAsync(ElasticsearchServiceFactory);
  }

  async onStop(container: IMidwayContainer): Promise<void> {
    const factory = await container.getAsync(ElasticsearchServiceFactory);
    await factory.stop();
  }
}
