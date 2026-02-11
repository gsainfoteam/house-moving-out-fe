import { Body as DrawerBody } from './body';
import { Close as DrawerClose } from './close';
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
 * @see Drawer.Header
 * @see Drawer.Title
 * @see Drawer.Description
 * @see Drawer.Body
 * @see Drawer.Footer
 * @see Drawer.Close
 *
 * @example
 * ```tsx
 * overlay.open(() => (
 *   <Drawer.Root>
 *     <Drawer.Header>
 *       <Drawer.Title>제목</Drawer.Title>
 *       <Drawer.Description>설명</Drawer.Description>
 *     </Drawer.Header>
 *     <Drawer.Body>본문</Drawer.Body>
 *     <Drawer.Footer>
 *       <Drawer.Close asChild><Button>닫기</Button></Drawer.Close>
 *     </Drawer.Footer>
 *   </Drawer.Root>
 * ));
 * ```
 */
export const Drawer = {
  Root: DrawerRoot,
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
