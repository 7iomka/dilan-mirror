import { memo, useLayoutEffect, useRef } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';
import am5geodata_worldLow from '@amcharts/amcharts5-geodata/worldLow';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

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

const _CoverageMap = ({ className, onSelectPoint }: CoverageMapProps) => {
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
        projection: am5map.geoMercator(),
        minZoomLevel: 1,
        maxZoomLevel: 4,
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

    // Create point series for markers
    const pointSeries = chart.series.push(
      am5map.ClusteredPointSeries.new(root, {
        groupIdField: 'state',
      }),
    );

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

    for (let i = 0; i < mapItems.length; i++) {
      const mapItem = mapItems[i];
      const data = {
        title: mapItem.title,
        country: mapItem.country,
        city: mapItem.city,
        address: mapItem.address,
        socials: mapItem.socials,
        contacts: mapItem.contacts,
        // geoJson expects [Longtitude, Latitude], while google and other maps vice versa
        geometry: { type: 'Point', coordinates: mapItem.coordinates.reverse() },
      };
      pointSeries.data.push(data);
    }

    chartRef.current = chart;

    return () => {
      root.dispose();
    };
  }, [onSelectPoint]);

  return <div id="chartdiv" className={className} />;
};

const CoverageMap = memo(_CoverageMap);

export type { CoverageMapProps };
export { CoverageMap };
