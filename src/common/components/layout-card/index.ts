import { Button as LayoutCardButton } from './button';
import { Content as LayoutCardContent } from './content';
import { Description as LayoutCardDescription } from './description';
import { Details as LayoutCardDetails } from './details';
import { Footer as LayoutCardFooter } from './footer';
import { Header as LayoutCardHeader } from './header';
import { Media as LayoutCardMedia } from './media';
import { Root as LayoutCardRoot } from './root';
import { Text as LayoutCardText } from './text';
import { Title as LayoutCardTitle } from './title';

/**
 * LayoutCard 컴포넌트
 *
 * 화면 레이아웃용 카드 컴포넌트입니다. 단계별 상태, 결과 상태, 일반 콘텐츠 등 공통 레이아웃에 사용됩니다.
 *
 * @see LayoutCard.Content
 * @see LayoutCard.Header
 * @see LayoutCard.Footer
 *
 * @example
 * ```tsx
 * <LayoutCard.Root>
 *   <LayoutCard.Content>
 *     <LayoutCard.Header>
 *       <LayoutCard.Media>
 *         <Icon className="h-auto w-full" />
 *       </LayoutCard.Media>
 *       <LayoutCard.Text>
 *         <LayoutCard.Title className="text-status-fail">
 *           제목
 *         </LayoutCard.Title>
 *         <LayoutCard.Description>
 *           설명
 *         </LayoutCard.Description>
 *       </LayoutCard.Text>
 *     </LayoutCard.Header>
 *     <LayoutCard.Details>
 *       <Accordion title="추가 정보">...</Accordion>
 *     </LayoutCard.Details>
 *   </LayoutCard.Content>
 *   <LayoutCard.Footer>
 *     <LayoutCard.Button variant="default">
 *       버튼
 *     </LayoutCard.Button>
 *   </LayoutCard.Footer>
 * </LayoutCard.Root>
 * ```
 */
export const LayoutCard = {
  Root: LayoutCardRoot,
  Content: LayoutCardContent,
  Header: LayoutCardHeader,
  Media: LayoutCardMedia,
  Text: LayoutCardText,
  Title: LayoutCardTitle,
  Description: LayoutCardDescription,
  Details: LayoutCardDetails,
  Footer: LayoutCardFooter,
  Button: LayoutCardButton,
};

export namespace LayoutCard {
  export namespace Root {
    export type Props = LayoutCardRoot.Props;
  }

  export namespace Content {
    export type Props = LayoutCardContent.Props;
  }

  export namespace Header {
    export type Props = LayoutCardHeader.Props;
  }

  export namespace Media {
    export type Props = LayoutCardMedia.Props;
  }

  export namespace Text {
    export type Props = LayoutCardText.Props;
  }

  export namespace Title {
    export type Props = LayoutCardTitle.Props;
  }

  export namespace Description {
    export type Props = LayoutCardDescription.Props;
  }

  export namespace Details {
    export type Props = LayoutCardDetails.Props;
  }

  export namespace Footer {
    export type Props = LayoutCardFooter.Props;
  }

  export namespace Button {
    export type Props = LayoutCardButton.Props;
  }
}
