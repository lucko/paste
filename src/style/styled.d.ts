import 'styled-components';
import { Theme } from './themes';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
