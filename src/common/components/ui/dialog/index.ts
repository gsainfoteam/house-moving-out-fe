import { Body as DialogBody } from './body';
import { Close as DialogClose } from './close';
import { Content as DialogContent } from './content';
import { Description as DialogDescription } from './description';
import { Footer as DialogFooter } from './footer';
import { Header as DialogHeader } from './header';
import { Root as DialogRoot } from './root';
import { Title as DialogTitle } from './title';
import { Trigger as DialogTrigger } from './trigger';

/**
 * Dialog 컴포넌트
 *
 * 모달 다이얼로그 UI를 구성하는 컴포넌트 집합입니다.
 * 버튼 클릭 시 떠오르는 확인/경고/폼 등의 레이어를 구현할 때 사용합니다.
 *
 * @see Dialog.Root
 * @see Dialog.Trigger
 * @see Dialog.Content
 * @see Dialog.Header
 * @see Dialog.Body
 * @see Dialog.Footer
 *
 * @example
 * ```tsx
 * <Dialog.Root>
 *   <Dialog.Trigger asChild>
 *     <Button>열기</Button>
 *   </Dialog.Trigger>
 *   <Dialog.Content>
 *     <Dialog.Header>
 *       <Dialog.Title>제목</Dialog.Title>
 *       <Dialog.Description>설명 텍스트입니다.</Dialog.Description>
 *     </Dialog.Header>
 *     <Dialog.Body>본문 내용</Dialog.Body>
 *     <Dialog.Footer>
 *       <Dialog.Close asChild>
 *         <Button variant="outline">취소</Button>
 *       </Dialog.Close>
 *       <Button>확인</Button>
 *     </Dialog.Footer>
 *   </Dialog.Content>
 * </Dialog.Root>
 * ```
 */
export const Dialog = {
  Root: DialogRoot,
  Trigger: DialogTrigger,
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

  export namespace Trigger {
    export type Props = DialogTrigger.Props;
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
