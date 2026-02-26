import { Body as DialogBody } from './body';
import { Close as DialogClose } from './close';
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
 * @see Dialog.Header
 * @see Dialog.Title
 * @see Dialog.Description
 * @see Dialog.Body
 * @see Dialog.Footer
 * @see Dialog.Close
 *
 * @example
 * ```tsx
 * overlay.open(() => (
 *   <Dialog.Root>
 *     <Dialog.Header>
 *       <Dialog.Title>제목</Dialog.Title>
 *       <Dialog.Description>설명</Dialog.Description>
 *     </Dialog.Header>
 *     <Dialog.Body>본문</Dialog.Body>
 *     <Dialog.Footer>
 *       <Dialog.Close asChild><Button>닫기</Button></Dialog.Close>
 *     </Dialog.Footer>
 *   </Dialog.Root>
 * ));
 * ```
 */
export const Dialog = {
  Root: DialogRoot,
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
