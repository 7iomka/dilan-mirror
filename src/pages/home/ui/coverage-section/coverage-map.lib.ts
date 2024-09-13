import * as am5 from '@amcharts/amcharts5';
import { colors } from '@/shared/config/theme';

export const settings = {
  polygonSeries: {
    fill: colors.primary.pale,
    stroke: colors.dark['700'],
    strokeOpacity: 0.3,
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
  cluster: {
    fill: colors.primary.light,
    label: {
      fill: colors.dark.DEFAULT,
    },
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

export const handleCreateBullet = (root: am5.Root) => {
  const sprite = am5.Container.new(root, {
    interactive: true,
    setStateOnChildren: true,
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

  sprite.set('tooltip', tooltip);

  const videoMarker = sprite.children.push(
    am5.Picture.new(root, {
      interactive: true,
      centerX: am5.p50,
      centerY: am5.p50,
      width: 36,
      height: 60,
      src: '/static/images/content/coverage-section/video-marker.svg',
      tooltipY: 20,
      tooltip,
      tooltipText: '{title}',
      cursorOverStyle: 'pointer',
    }),
  );

  return am5.Bullet.new(root, {
    sprite,
  });
};

export const handleCreateClusteredBullet = (root: am5.Root) => {
  const container = am5.Container.new(root, {});
  const circle1 = container.children.push(
    am5.Circle.new(root, {
      radius: 10,
      tooltipY: 0,
      fill: am5.color(settings.cluster.fill),
    }),
  );
  const circle2 = container.children.push(
    am5.Circle.new(root, {
      radius: 14,
      fillOpacity: 0.3,
      tooltipY: 0,
      fill: am5.color(settings.cluster.fill),
    }),
  );
  const circle3 = container.children.push(
    am5.Circle.new(root, {
      radius: 18,
      fillOpacity: 0.3,
      tooltipY: 0,
      fill: am5.color(settings.cluster.fill),
    }),
  );
  const label = container.children.push(
    am5.Label.new(root, {
      centerX: am5.p50,
      centerY: am5.p50,
      fill: am5.color(settings.cluster.label.fill),
      populateText: true,
      fontSize: 12,
      fontWeight: '700',
      text: '{value}',
    }),
  );
  return am5.Bullet.new(root, {
    sprite: container,
  });
};
