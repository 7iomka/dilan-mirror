import * as am5 from '@amcharts/amcharts5';
import { colors } from '@/shared/config/theme';

export const settings = {
  pulsation: {
    duration: 1000,
    fill: colors.primary.DEFAULT,
  },

  tooltip: {
    fill: colors.primary.DEFAULT,
    stroke: colors.primary.dark,
  },
  bullet: {
    fill: colors.primary.DEFAULT,
  },

  graticule: {
    stroke: colors.dark['800'],
    strokeOpacity: 0.4,
  },
};

export class MyTheme extends am5.Theme {
  setupDefaultRules() {
    this.rule('InterfaceColors').setAll({
      stroke: am5.color(colors.primary.DEFAULT),
      fill: am5.color(colors.dark.DEFAULT),
      primaryButton: am5.color(colors.primary.DEFAULT),
      primaryButtonHover: am5.color(colors.primary.light),
      primaryButtonDown: am5.color(colors.primary.light),
      primaryButtonActive: am5.color(colors.primary.light),
      // primaryButtonText: am5.color(colors.dark.DEFAULT),
      primaryButtonStroke: am5.color(colors.primary.DEFAULT),
      primaryButtonDisabled: am5.color(colors.dark['700']),
      primaryButtonTextDisabled: am5.color('#ff0'),

      // secondaryButton: Color.fromHex(0xd8ded4),
      // secondaryButtonHover: Color.lighten(Color.fromHex(0xd8ded4), 0.1),
      // secondaryButtonDown: Color.lighten(Color.fromHex(0xd8ded4), 0.15),
      // secondaryButtonActive: Color.lighten(Color.fromHex(0xd8ded4), 0.2),
      // secondaryButtonText: Color.fromHex(0x161814),
      // secondaryButtonStroke: Color.lighten(Color.fromHex(0xd8ded4), -0.2),

      // grid: Color.fromHex(0x161814),
      background: am5.color(colors.dark.DEFAULT),
      alternativeBackground: am5.color(colors.dark.DEFAULT),
      text: am5.color('#ffffff'),
      alternativeText: am5.color(colors.dark.DEFAULT),
      disabled: am5.color(colors.dark['700']),
      // positive: Color.fromHex(0x50b300),
      // negative: Color.fromHex(0xb30000),
    });
  }
}

export const handleCreateBullet = (root: am5.Root, { colorset }: { colorset: am5.ColorSet }) => {
  const sprite = am5.Container.new(root, {
    interactive: true,
    // setStateOnChildren: true,
    tooltipText: '{title}',
  });

  const tooltip = am5.Tooltip.new(root, {
    getFillFromSprite: false,
    getStrokeFromSprite: false,
    background: am5.Rectangle.new(root, {
      fill: am5.color(settings.tooltip.fill),
      stroke: am5.color(settings.tooltip.stroke),
      strokeWidth: 1,
    }),
    autoTextColor: true,
  });

  // tooltip.label.set('fill', root.interfaceColors.get('alternativeText'));

  sprite.set('tooltip', tooltip);

  const pulsation = sprite.children.push(
    am5.Circle.new(root, {
      radius: 4,
      fill: am5.color(settings.pulsation.fill),
      strokeWidth: 0,
    }),
  );
  pulsation.animate({
    key: 'scale',
    from: 1,
    to: 4,
    duration: settings.pulsation.duration,
    easing: am5.ease.out(am5.ease.cubic),
    loops: Infinity,
  });
  pulsation.animate({
    key: 'opacity',
    from: 1,
    to: 0,
    duration: settings.pulsation.duration,
    easing: am5.ease.out(am5.ease.cubic),
    loops: Infinity,
  });

  const bullet = sprite.children.push(
    am5.Circle.new(root, {
      radius: 4,
      fill: am5.color(settings.bullet.fill),
      // stroke: root.interfaceColors.get('alternativeBackground'),
      // strokeWidth: 1,
      // strokeOpacity: 0.7,
    }),
  );

  return am5.Bullet.new(root, {
    sprite,
  });
  // const container = am5.Container.new(root, {
  //   tooltipText: '{title}',
  //   cursorOverStyle: 'pointer',
  // });

  // const pulsationCircle = container.children.push(
  //   am5.Circle.new(root, {
  //     radius: 4,
  //     // tooltipY: 0,
  //     fill: am5.color('#57b396'),
  //     strokeOpacity: 0,
  //   }),
  // );

  // const dotCircle = container.children.push(
  //   am5.Circle.new(root, {
  //     radius: 4,
  //     tooltipY: 0,
  //     tooltip,
  //     // fill: colorset.next(),
  //     fill: am5.color('#7ffed7'),
  //     strokeOpacity: 0,
  //     // tooltipText: '{title}',
  //   }),
  // );

  // const duration = 1000;

  // pulsationCircle.animate({
  //   key: 'scale',
  //   from: 1,
  //   to: 4,
  //   duration,
  //   easing: am5.ease.out(am5.ease.cubic),
  //   loops: Infinity,
  // });
  // pulsationCircle.animate({
  //   key: 'opacity',
  //   from: 1,
  //   to: 0,
  //   duration,
  //   easing: am5.ease.out(am5.ease.cubic),
  //   loops: Infinity,
  // });

  // return am5.Bullet.new(root, {
  //   sprite: container,
  // });
};

export const handleCreateClusteredBullet = (root: am5.Root) => {
  // const container = am5.Container.new(root, {});
  // const circle1 = container.children.push(
  //   am5.Circle.new(root, {
  //     radius: 8,
  //     tooltipY: 0,
  //     fill: am5.color(0xff8c00),
  //   }),
  // );
  // const circle2 = container.children.push(
  //   am5.Circle.new(root, {
  //     radius: 12,
  //     fillOpacity: 0.3,
  //     tooltipY: 0,
  //     fill: am5.color(0xff8c00),
  //   }),
  // );
  // const circle3 = container.children.push(
  //   am5.Circle.new(root, {
  //     radius: 16,
  //     fillOpacity: 0.3,
  //     tooltipY: 0,
  //     fill: am5.color(0xff8c00),
  //   }),
  // );
  // const label = container.children.push(
  //   am5.Label.new(root, {
  //     centerX: am5.p50,
  //     centerY: am5.p50,
  //     fill: am5.color(0xffffff),
  //     populateText: true,
  //     fontSize: '8',
  //     text: '{value}',
  //   }),
  // );
  // return am5.Bullet.new(root, {
  //   sprite: container,
  // });
};
