import { Body as DrawerBody } from './body';
import { Close as DrawerClose } from './close';
import { Content as DrawerContent } from './content';
import { Description as DrawerDescription } from './description';
import { Footer as DrawerFooter } from './footer';
import { Header as DrawerHeader } from './header';
import { Root as DrawerRoot } from './root';
import { Title as DrawerTitle } from './title';
import { Trigger as DrawerTrigger } from './trigger';

/**
 * Drawer 컴포넌트
 *
 * 화면 가장자리에서 열리는 드로어(바텀시트/사이드시트) UI를 구성하는 컴포넌트 집합입니다.
 * 페이지 전환 없이 추가 정보나 설정, 폼 등을 표시할 때 사용합니다.
 *
 * @see Drawer.Root
 * @see Drawer.Trigger
 * @see Drawer.Content
 * @see Drawer.Header
 * @see Drawer.Body
 * @see Drawer.Footer
 *
 * @example
 * ```tsx
 * <Drawer.Root>
 *   <Drawer.Trigger asChild>
 *     <Button>필터 열기</Button>
 *   </Drawer.Trigger>
 *   <Drawer.Content>
 *     <Drawer.Header>
 *       <Drawer.Title>필터</Drawer.Title>
 *       <Drawer.Description>검색 결과를 더 좁혀 보세요.</Drawer.Description>
 *     </Drawer.Header>
 *     <Drawer.Body>필터 폼 내용</Drawer.Body>
 *     <Drawer.Footer>
 *       <Drawer.Close asChild>
 *         <Button variant="outline">초기화</Button>
 *       </Drawer.Close>
 *       <Button>적용</Button>
 *     </Drawer.Footer>
 *   </Drawer.Content>
 * </Drawer.Root>
 * ```
 */
export const Drawer = {
  Root: DrawerRoot,
  Trigger: DrawerTrigger,
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

  export namespace Trigger {
    export type Props = DrawerTrigger.Props;
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
