import { Body as LayoutCardBody } from './body';
import { Center as LayoutCardCenter } from './center';
import { Description as LayoutCardDescription } from './description';
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
 * 기본적으로 `Header` / `Body` / `Footer` 구조를 가지며,
 * 필요할 경우에만 `Center`를 사용해 `Header`+`Body` 블록을 카드 내부 세로 중앙에 배치할 수 있습니다.
 *
 * @see LayoutCard.Header
 * @see LayoutCard.Center
 * @see LayoutCard.Body
 * @see LayoutCard.Footer
 *
 * @example
 * ```tsx
 * <LayoutCard.Root>
 *   <LayoutCard.Center>
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
 *     <LayoutCard.Body>
 *       <Accordion title="추가 정보">...</Accordion>
 *     </LayoutCard.Body>
 *   </LayoutCard.Center>
 *   <LayoutCard.Footer>
 *     <Button variant="default">
 *       버튼
 *     </Button>
 *   </LayoutCard.Footer>
 * </LayoutCard.Root>
 * ```
 */
export const LayoutCard = {
  Root: LayoutCardRoot,
  Header: LayoutCardHeader,
  Center: LayoutCardCenter,
  Body: LayoutCardBody,
  Media: LayoutCardMedia,
  Text: LayoutCardText,
  Title: LayoutCardTitle,
  Description: LayoutCardDescription,
  Footer: LayoutCardFooter,
};

export namespace LayoutCard {
  export namespace Root {
    export type Props = LayoutCardRoot.Props;
  }

  export namespace Body {
    export type Props = LayoutCardBody.Props;
  }

  export namespace Center {
    export type Props = LayoutCardCenter.Props;
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

  export namespace Footer {
    export type Props = LayoutCardFooter.Props;
  }
}
