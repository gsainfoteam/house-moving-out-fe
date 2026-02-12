import { Content as AccordionContent } from './content';
import { Header as AccordionHeader } from './header';
import { Root as AccordionRoot } from './root';
import { Title as AccordionTitle } from './title';

/**
 * Accordion – 접었다 펼칠 수 있는 패널.
 * Header는 flex justify-between이므로, 우측에 넣을 내용은 children으로 넣고 ml-auto 등으로 정렬하면 된다.
 *
 * @example
 * ```tsx
 * <Accordion.Root defaultOpen={false}>
 *   <Accordion.Header>
 *     <Accordion.Title>가구 및 에어컨</Accordion.Title>
 *     <span className="ml-auto text-primary-main">(5/5)</span>
 *   </Accordion.Header>
 *   <Accordion.Content>...</Accordion.Content>
 * </Accordion.Root>
 * ```
 */
export const Accordion = {
  Root: AccordionRoot,
  Header: AccordionHeader,
  Title: AccordionTitle,
  Content: AccordionContent,
};

export namespace Accordion {
  export namespace Root {
    export type Props = AccordionRoot.Props;
  }
  export namespace Header {
    export type Props = AccordionHeader.Props;
  }
  export namespace Title {
    export type Props = AccordionTitle.Props;
  }
  export namespace Content {
    export type Props = AccordionContent.Props;
  }
}
