import { Body as DialogBody } from './body';
import { Close as DialogClose } from './close';
import { Content as DialogContent } from './content';
import { Description as DialogDescription } from './description';
import { Footer as DialogFooter } from './footer';
import { Header as DialogHeader } from './header';
import { Root as DialogRoot } from './root';
import { Title as DialogTitle } from './title';

/**
 * Dialog 컴포넌트
 *
 * 모달 다이얼로그 UI를 구성하는 컴포넌트 집합입니다.
 * overlay.open()으로 열며, OverlayHost 안에서만 사용합니다.
 *
 * @see Dialog.Root
 * @see Dialog.Content
 * @see Dialog.Header
 * @see Dialog.Body
 * @see Dialog.Footer
 *
 * @example
 * ```tsx
 * overlay.open(({ close }) => (
 *   <Dialog.Root>
 *     <Dialog.Content>...</Dialog.Content>
 *   </Dialog.Root>
 * ));
 * ```
 */
export const Dialog = {
  Root: DialogRoot,
  Content: DialogContent,
  Body: DialogBody,
  Header: DialogHeader,
  Title: DialogTitle,
  Description: DialogDescription,
  Footer: DialogFooter,
  Close: DialogClose,
};

export namespace Dialog {
  export namespace Root {
    export type Props = DialogRoot.Props;
  }

  export namespace Content {
    export type Props = DialogContent.Props;
  }

  export namespace Body {
    export type Props = DialogBody.Props;
  }

  export namespace Header {
    export type Props = DialogHeader.Props;
  }

  export namespace Title {
    export type Props = DialogTitle.Props;
  }

  export namespace Description {
    export type Props = DialogDescription.Props;
  }

  export namespace Footer {
    export type Props = DialogFooter.Props;
  }

  export namespace Close {
    export type Props = DialogClose.Props;
  }
}
