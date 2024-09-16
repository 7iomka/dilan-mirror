/* eslint-disable @typescript-eslint/no-unused-vars */
import * as am5 from '@amcharts/amcharts5';
import type { ClusteredPointSeries } from '@amcharts/amcharts5/map';
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
    stroke: colors.primary.pale,
    label: {
      fill: colors.dark.DEFAULT,
    },
  },
  curtain: {
    fill: colors.dark['800'],
    fillOpacity: 0.7,
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
      primaryButtonText: am5.color(colors.dark.DEFAULT),
      primaryButtonStroke: am5.color(colors.dark['700']),
      primaryButtonDisabled: am5.color(colors.dark['200']),

      background: am5.color(colors.dark.DEFAULT),
      alternativeBackground: am5.color(colors.dark.DEFAULT),
      text: am5.color('#ffffff'),
      alternativeText: am5.color(colors.dark.DEFAULT),
      disabled: am5.color(colors.dark['700']),
    });
  }
}

export const handleCreateBullet = (root: am5.Root) => {
  const sprite = am5.Container.new(root, {
    interactive: true,
    tooltipY: 0,
    tooltipText: '{title}',
    cursorOverStyle: 'pointer',
  });

  const videoMarker = sprite.children.push(
    am5.Picture.new(root, {
      interactive: true,
      centerX: am5.p50,
      centerY: am5.p50,
      width: 18,
      height: 30,
      src: '/static/images/content/coverage-section/video-marker.svg',
    }),
  );

  return am5.Bullet.new(root, {
    sprite,
  });
};

/**
 * Create clustered bullet
 */
export const handleCreateClusteredBullet = (root: am5.Root, pointSeries: ClusteredPointSeries) => {
  const sprite = am5.Container.new(root, {
    cursorOverStyle: 'pointer',
  });

  const videoMarker = sprite.children.push(
    am5.Picture.new(root, {
      interactive: true,
      width: 36,
      height: 60,
      src: '/static/images/content/coverage-section/video-marker.svg',
    }),
  );

  const circle1 = sprite.children.push(
    am5.Circle.new(root, {
      radius: 10,
      fill: am5.color(settings.cluster.fill),
      stroke: am5.color(settings.cluster.stroke),
      strokeWidth: 1,
      x: 5,
      y: 5,
      centerX: am5.p50,
      centerY: am5.p50,
    }),
  );

  const label = sprite.children.push(
    am5.Label.new(root, {
      fill: am5.color(settings.cluster.label.fill),
      populateText: true,
      fontSize: 12,
      fontWeight: '700',
      text: '{value}',
      x: 5,
      y: 5,
      centerX: am5.p50,
      centerY: am5.p50,
    }),
  );

  sprite.events.on('click', (e) => {
    pointSeries.zoomToCluster(e.target.dataItem!);
  });

  return am5.Bullet.new(root, {
    sprite,
  });
};
