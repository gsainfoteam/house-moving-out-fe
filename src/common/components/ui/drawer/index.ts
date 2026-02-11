import { Body as DrawerBody } from './body';
import { Close as DrawerClose } from './close';
import { Content as DrawerContent } from './content';
import { Description as DrawerDescription } from './description';
import { Footer as DrawerFooter } from './footer';
import { Header as DrawerHeader } from './header';
import { Root as DrawerRoot } from './root';
import { Title as DrawerTitle } from './title';

/**
 * Drawer 컴포넌트
 *
 * 화면 가장자리에서 열리는 드로어(바텀시트/사이드시트) UI를 구성하는 컴포넌트 집합입니다.
 * overlay.open()으로 열며, OverlayHost 안에서만 사용합니다.
 *
 * @see Drawer.Root
 * @see Drawer.Content
 * @see Drawer.Header
 * @see Drawer.Body
 * @see Drawer.Footer
 *
 * @example
 * ```tsx
 * overlay.open(({ close }) => (
 *   <Drawer.Root>
 *     <Drawer.Content>...</Drawer.Content>
 *   </Drawer.Root>
 * ));
 * ```
 */
export const Drawer = {
  Root: DrawerRoot,
  Content: DrawerContent,
  Body: DrawerBody,
  Header: DrawerHeader,
  Title: DrawerTitle,
  Description: DrawerDescription,
  Footer: DrawerFooter,
  Close: DrawerClose,
};

export namespace Drawer {
  export namespace Root {
    export type Props = DrawerRoot.Props;
  }

  export namespace Content {
    export type Props = DrawerContent.Props;
  }

  export namespace Body {
    export type Props = DrawerBody.Props;
  }

  export namespace Header {
    export type Props = DrawerHeader.Props;
  }

  export namespace Title {
    export type Props = DrawerTitle.Props;
  }

  export namespace Description {
    export type Props = DrawerDescription.Props;
  }

  export namespace Footer {
    export type Props = DrawerFooter.Props;
  }

  export namespace Close {
    export type Props = DrawerClose.Props;
  }
}
