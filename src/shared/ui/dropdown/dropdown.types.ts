import type { Placement } from '@floating-ui/react';
import type { ReactElement } from 'react';

export type DropdownTriggerProps = { visible: boolean; toggle?: () => void };
export type OverlayProps = { toggle: () => void; open: () => void; close: () => void };

export type DropdownTriggerFC = (props: DropdownTriggerProps) => ReactElement;
export type TriggerProps = ReactElement | DropdownTriggerFC;

export type DropdownOptions = {
  zIndex?: number;
  disabled?: boolean;
  placement?: Placement;
  arrow?: boolean;
  offset?: number;
  autoWidth?: boolean;
  selectedIndex?: number;
};
