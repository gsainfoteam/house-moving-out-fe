import { Body as DrawerBody } from './body';
import { Close as DrawerClose } from './close';
import { Content as DrawerContent } from './content';
import { Description as DrawerDescription } from './description';
import { Footer as DrawerFooter } from './footer';
import { Header as DrawerHeader } from './header';
import { Root as DrawerRoot } from './root';
import { Title as DrawerTitle } from './title';
import { Trigger as DrawerTrigger } from './trigger';

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
