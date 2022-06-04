export * from './dist/index';
import { ClientOptions } from '@elastic/elasticsearch';

declare module '@midwayjs/core/dist/interface' {
  interface MidwayConfig {
    elasticsearch?: ServiceFactoryConfigOption<ClientOptions>;
  }
}
