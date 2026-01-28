import { Body as DialogBody } from './body';
import { Close as DialogClose } from './close';
import { Content as DialogContent } from './content';
import { Description as DialogDescription } from './description';
import { Footer as DialogFooter } from './footer';
import { Header as DialogHeader } from './header';
import { Root as DialogRoot } from './root';
import { Title as DialogTitle } from './title';
import { Trigger as DialogTrigger } from './trigger';

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
