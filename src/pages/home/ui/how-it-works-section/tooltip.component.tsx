// import type { ReactNode } from 'react';
// import { useRef, useState } from 'react';
// import type { ReferenceType, Placement } from '@floating-ui/react';
// import {
//   offset,
//   shift,
//   flip,
//   useFloating,
//   autoUpdate,
//   useInteractions,
//   useHover,
//   useFocus,
//   useDismiss,
//   useRole,
//   arrow,
//   FloatingArrow,
//   useTransitionStyles,
// } from '@floating-ui/react';

// export interface RenderOpenerProps extends Record<string, unknown> {
//   ref: (node: ReferenceType | null) => void;
// }

// interface TooltipProps {
//   content?: ReactNode;
//   referenceElement: HTMLElement | null;
//   tooltipRef: React.MutableRefObject<HTMLElement | null>;
//   // renderOpener: (props: RenderOpenerProps) => ReactNode;
//   placement?: Placement;
// }

// export const Tooltip = ({ content, referenceElement, tooltipRef, placement }: TooltipProps) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const arrowRef = useRef(null);

//   const {
//     refs: { setReference, setFloating },
//     floatingStyles,
//     context,
//   } = useFloating({
//     open: isOpen,
//     onOpenChange: setIsOpen,
//     placement,
//     middleware: [
//       offset(12),
//       flip(),
//       shift(),
//       arrow({
//         element: arrowRef,
//       }),
//     ],
//     whileElementsMounted: autoUpdate,
//   });

//   const hover = useHover(context, { move: false });
//   const focus = useFocus(context);
//   const dismiss = useDismiss(context);
//   const role = useRole(context, { role: 'tooltip' });

//   const { getReferenceProps, getFloatingProps } = useInteractions([hover, focus, dismiss, role]);

//   const { styles: transitionStyles } = useTransitionStyles(context, {
//     initial: {
//       opacity: 0,
//       transform: 'scale(0.8)',
//     },
//   });

//   return (
//     <>
//       {renderOpener({ ref: setReference, ...getReferenceProps() })}
//       {isOpen && content && (
//         <div ref={setFloating} style={{ ...floatingStyles, zIndex: 1 }} {...getFloatingProps()}>
//           <div className="p-12 max-w-300 bg-dark" style={transitionStyles}>
//             <FloatingArrow
//               className="fill-dark"
//               tipRadius={2}
//               height={8}
//               ref={arrowRef}
//               context={context}
//             />
//             {content}
//           </div>
//         </div>
//       )}
//     </>
//   );
// };
