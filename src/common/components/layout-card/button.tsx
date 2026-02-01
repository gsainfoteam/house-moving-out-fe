import type { ComponentProps } from 'react';

import { Button as BaseButton } from '@/common/components/ui/button';

/**
 * 레이아웃 카드 하단 액션 버튼입니다.
 * @see LayoutCard.Footer
 */
export const Button = (props: Button.Props) => <BaseButton size="full" {...props} />;

export namespace Button {
  export type Props = ComponentProps<typeof BaseButton>;
}
