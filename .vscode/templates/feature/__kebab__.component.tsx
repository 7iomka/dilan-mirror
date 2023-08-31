import { modelView } from '@/shared/lib/factory';
import { factory } from './__kebab__.model';

export interface Create__pascal__ComponentProps {
  className?: string;
}

export const Create__pascal__Component = modelView(
  factory, ({ className }: Create__pascal__ComponentProps & { model: ReturnType<typeof factory.useModel> }) => {
      const model = factory.useModel();

      return (<div className={className}> </div>)
    }
);
