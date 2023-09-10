import type { ReactElement } from 'react';
import {
  cloneElement,
  isValidElement,
  useCallback,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import type { ReferenceType } from '@floating-ui/react';
import {
  useDismiss,
  useRole,
  useClick,
  useInteractions,
  FloatingFocusManager,
  useId,
  FloatingArrow,
  FloatingPortal,
} from '@floating-ui/react';
import type { Middleware } from '@floating-ui/dom';
import clsx from 'clsx';
import { useFloatUiDropdown } from './dropdown.lib';
import type {
  DropdownOptions,
  DropdownTriggerFC,
  OverlayProps,
  TriggerProps,
} from './dropdown.types';

interface DropdownProps {
  className?: string;
  classNames?: {
    overlay?: string;
    arrow?: string;
  };
  options?: DropdownOptions;
  setTriggerRef?: (ref: HTMLElement | null) => void;
  middleware?: Middleware[];
  onVisibleChange?: (visible: boolean) => void;
  children: (props: OverlayProps) => ReactElement;
  trigger: TriggerProps;
}

export interface DropdownControl {
  close: () => void;
  open: () => void;
  toggle: (open: boolean) => void;
}

const CONST_INITIAL_DROPDOWN_INDEX = 1002;

const Dropdown = forwardRef<DropdownControl, DropdownProps>((props, ref) => {
  const {
    trigger,
    children,
    onVisibleChange,
    options = {
      zIndex: CONST_INITIAL_DROPDOWN_INDEX,
    },
    className,
    middleware = [],
    classNames,
  } = props;

  const arrowEnabled = options.arrow ?? true;
  const disabled = options.disabled ?? false;
  const [isOpen, setOpenValue] = useState(false);

  const setOpen = useCallback(
    (isOpenState: boolean) => {
      if (disabled) {
        return;
      }
      setOpenValue(isOpenState);
    },
    [setOpenValue, disabled],
  );

  const toggle = useCallback(() => {
    setOpen(!isOpen);
    onVisibleChange?.(!isOpen);
  }, [isOpen, onVisibleChange, setOpen]);

  const open = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const close = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  useImperativeHandle(ref, () => ({ open, toggle, close }));

  const arrowRef = useRef(null);
  const { refs, floatingStyles, context } = useFloatUiDropdown({
    ...options,
    middleware,
    setOpen,
    isOpen,
    arrowRef,
  });
  const triggerEl = isValidElement(trigger)
    ? trigger
    : (trigger as DropdownTriggerFC)({
        visible: isOpen,
        toggle,
      });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role]);

  const headingId = useId();

  const setRef = (v: ReferenceType | null) => {
    refs.setReference(v);
    props.setTriggerRef?.(v as HTMLElement);
  };

  return (
    <>
      {cloneElement(triggerEl, { ref: setRef, ...getReferenceProps() })}
      {isOpen && (
        <FloatingPortal>
          <FloatingFocusManager context={context}>
            <div
              className={clsx(className, classNames?.overlay)}
              ref={refs.setFloating}
              style={floatingStyles}
              aria-labelledby={headingId}
              {...getFloatingProps()}
            >
              {children({ open, close, toggle })}
              {arrowEnabled && (
                <FloatingArrow
                  ref={arrowRef}
                  context={context}
                  className={clsx(classNames?.arrow)}
                  strokeWidth={1}
                />
              )}
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </>
  );
});

export type { DropdownProps };
export { Dropdown };
