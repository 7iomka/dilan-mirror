import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useLayoutEffect, useRef } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';
import am5geodata_worldLow from '@amcharts/amcharts5-geodata/worldLow';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

import * as am5xy from '@amcharts/amcharts5/xy';
import { colors } from '@/shared/config/theme';
import { mapItems } from './coverage-section.data';
import {
  handleCreateClusteredBullet,
  handleCreateBullet,
  MyTheme,
  settings,
} from './coverage-map.lib';

interface CoverageMapProps {
  className?: string;
}

const CoverageMap = ({ className }: CoverageMapProps) => {
  // const { t } = useTranslation();

  const chartRef = useRef<am5map.MapChart | null>(null);

  useLayoutEffect(() => {
    const root = am5.Root.new('chartdiv');
    root._logo?.dispose();

    root.tapToActivate = true;
    root.tapToActivateTimeout = 2000;

    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([am5themes_Animated.new(root), MyTheme.new(root)]);

    // Create the map chart
    const chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: 'rotateX',
        panY: 'rotateY',
        // projection: am5map.geoMercator(),
        // projection: am5map.geoNaturalEarth1(),
        projection: am5map.geoOrthographic(),
        wheelable: false,
        zoomControl: am5map.ZoomControl.new(root, {}),
        // pinchZoom: false,
      }),
    );

    // Create the container
    const cont = chart.children.push(
      am5.Container.new(root, {
        layout: root.horizontalLayout,
        x: 0,
        y: 0,
      }),
    );

    // const cont = chart.children.push(
    //   am5.Container.new(root, {
    //     layout: root.horizontalLayout,
    //     x: 20,
    //     y: 40,
    //   }),
    // );

    // 1) Graticule
    const graticuleSeries = chart.series.push(
      am5map.GraticuleSeries.new(root, {
        step: 10,
      }),
    );

    graticuleSeries.mapLines.template.setAll({
      stroke: am5.color(settings.graticule.stroke),
      // stroke: root.interfaceColors.get('alternativeBackground'),
      strokeOpacity: settings.graticule.strokeOpacity,
      // strokeDashoffset: 3,
      // strokeDasharray: [1, 5],
    });

    // Create series for background fill
    // https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/#Background_polygon
    const backgroundSeries = chart.series.unshift(am5map.MapPolygonSeries.new(root, {}));
    backgroundSeries.mapPolygons.template.setAll({
      fill: root.interfaceColors.get('alternativeBackground'),
      fillOpacity: 0.2,
      strokeOpacity: 0,
    });

    // Add background polygon
    // https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/#Background_polygon
    backgroundSeries.data.push({
      geometry: am5map.getGeoRectangle(90, 180, -90, -180),
    });

    // Create main polygon series for countries
    // https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
    const polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
      }),
    );

    // Create point series for markers
    // https://www.amcharts.com/docs/v5/charts/map-chart/map-point-series/
    const pointSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));
    // const pointSeries = chart.series.push(
    //   am5map.ClusteredPointSeries.new(root, {
    //     // minDistance: 30, // 20px by default
    //     // scatterDistance: 10,
    //     // scatterRadius: 10,
    //     // stopClusterZoom: 0.9
    //   }),
    // );

    const colorset = am5.ColorSet.new(root, {});

    pointSeries.bullets.push((v) => handleCreateBullet(v, { colorset }));

    // pointSeries.set('clusteredBullet', handleCreateClusteredBullet);

    for (let i = 0; i < mapItems.length; i++) {
      const mapItem = mapItems[i];
      pointSeries.data.push({
        title: mapItem.title,
        geometry: { type: 'Point', coordinates: mapItem.coordinates },
      });
    }

    // Add cursor
    // chart.set('cursor', am5xy.XYCursor.new(root, {}));

    // Rotate animation
    chart.animate({
      key: 'rotationX',
      from: 0,
      to: 360,
      duration: 180000,
      loops: Infinity,
    });

    chartRef.current = chart;

    return () => {
      root.dispose();
    };
  }, []);

  return <div id="chartdiv" className={clsx('w-[--container] h-[500px]', className)} />;
};

export type { CoverageMapProps };
export { CoverageMap };
