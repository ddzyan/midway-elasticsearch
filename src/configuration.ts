import { Configuration } from '@midwayjs/decorator';
import * as DefaultConfig from './config/config.default';

@Configuration({
  namespace: 'elasticsearch',
  importConfigs: [
    {
      default: DefaultConfig,
    },
  ],
})
export class ElasticsearchConfiguration {
  async onReady() {
    // TODO something
  }
}
