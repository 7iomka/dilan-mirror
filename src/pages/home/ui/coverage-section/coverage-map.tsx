import { memo, useLayoutEffect, useRef } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';
import am5geodata_worldLow from '@amcharts/amcharts5-geodata/worldLow';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

import { useTranslation } from 'react-i18next';
import { mapItems } from './coverage-section.data';
import {
  handleCreateClusteredBullet,
  handleCreateBullet,
  MyTheme,
  settings,
} from './coverage-map.lib';

interface CoverageMapProps {
  className?: string;
  onSelectPoint: (pointData: any) => void;
}

const CoverageMap = memo(({ className, onSelectPoint }: CoverageMapProps) => {
  const chartRef = useRef<am5map.MapChart | null>(null);
  const { t } = useTranslation();

  useLayoutEffect(() => {
    const root = am5.Root.new('chartdiv');
    root._logo?.dispose();

    root.tapToActivate = true;
    root.tapToActivateTimeout = 1000;

    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([am5themes_Animated.new(root), MyTheme.new(root)]);

    // Create the map chart
    const chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: 'rotateX',
        projection: am5map.geoMercator(),
        wheelY: 'none',
        minZoomLevel: 1,
        maxZoomLevel: 6,
        zoomControl: am5map.ZoomControl.new(root, {
          visible: true,
          position: 'absolute',
        }),
        themeTags: ['map'],
      }),
    );

    // Create the container
    const mapContainer = chart.children.push(
      am5.Container.new(root, {
        layout: root.horizontalLayout,
        x: 20,
        y: 40,
      }),
    );

    // Create main polygon series for countries
    // https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
    const polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
        exclude: ['AQ'],
      }),
    );

    polygonSeries.mapPolygons.template.setAll({
      fill: am5.color(settings.polygonSeries.fill),
      stroke: am5.color(settings.polygonSeries.stroke),
      strokeOpacity: settings.polygonSeries.strokeOpacity,
      strokeWidth: 1,
    });

    // Create shared tooltip
    const tooltip = am5.Tooltip.new(root, {
      getFillFromSprite: false,
    });

    const tooltipBg = tooltip.get('background')!;
    tooltipBg.set('fill', am5.color(settings.tooltip.fill));
    tooltipBg.set('stroke', am5.color(settings.tooltip.stroke));
    tooltipBg.set('strokeWidth', 1);

    // Create point series for markers
    const pointSeries = chart.series.push(
      am5map.ClusteredPointSeries.new(root, {
        groupIdField: 'state',
        latitudeField: 'latitude',
        longitudeField: 'longitude',
      }),
    );

    // Attach tooltip to points
    pointSeries.set('tooltip', tooltip);

    // Set clustered bullet
    pointSeries.set('clusteredBullet', handleCreateClusteredBullet);

    // Create regular bullets
    pointSeries.bullets.push((_root, series, dataItem) => {
      const bullet = handleCreateBullet(_root);
      bullet.get('sprite').events.on('click', () => {
        onSelectPoint(dataItem.dataContext);
      });
      return bullet;
    });

    pointSeries.data.setAll(mapItems);

    // Create overlay, curtain + message to show when wheel is used over chart without CTRL
    const overlay = root.container.children.push(
      am5.Container.new(root, {
        width: am5.p100,
        height: am5.p100,
        layer: 100,
        visible: false,
      }),
    );

    const curtain = overlay.children.push(
      am5.Rectangle.new(root, {
        width: am5.p100,
        height: am5.p100,
        fill: am5.color(settings.curtain.fill),
        fillOpacity: settings.curtain.fillOpacity,
      }),
    );

    const message = overlay.children.push(
      am5.Label.new(root, {
        text: t('coverage.map.zoomMessage', 'Use CTRL + Scroll to zoom'),
        fontSize: 30,
        x: am5.p50,
        y: am5.p50,
        centerX: am5.p50,
        centerY: am5.p50,
      }),
    );

    // Show overlay when wheel is used over chart
    let overlayTimeoutDisposable: am5.IDisposer | null = null;

    chart.events.on('wheel', (ev) => {
      if (ev.originalEvent.ctrlKey) {
        ev.originalEvent.preventDefault();
        chart.set('wheelY', 'zoom');
      } else {
        chart.set('wheelY', 'none');
        overlay.show();
        overlayTimeoutDisposable?.dispose();

        overlayTimeoutDisposable = overlay.setTimeout(() => {
          overlay.hide();
        }, 1500);
      }
    });

    // Set clicking on "water" to zoom out
    // chart.chartContainer.get('background')?.events.on('click', () => {
    //   chart.goHome();
    // });

    // Make stuff animate on load
    chart.appear(1000, 100);

    chartRef.current = chart;

    return () => {
      root.dispose();
    };
  }, [onSelectPoint]);

  return <div id="chartdiv" className={className} />;
});

export type { CoverageMapProps };
export { CoverageMap };
