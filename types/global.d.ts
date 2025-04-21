declare module 'react-native-maps' {
  import React from 'react';
  import { ViewProps } from 'react-native';
  
  export interface RegionType {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  }
  
  export interface MapViewProps extends ViewProps {
    initialRegion?: RegionType;
    region?: RegionType;
    customMapStyle?: Array<any>;
    showsUserLocation?: boolean;
    followsUserLocation?: boolean;
    showsMyLocationButton?: boolean;
    showsCompass?: boolean;
    zoomEnabled?: boolean;
    rotateEnabled?: boolean;
    pitchEnabled?: boolean;
    scrollEnabled?: boolean;
    onRegionChange?: (region: RegionType) => void;
    onRegionChangeComplete?: (region: RegionType) => void;
    onPress?: (event: any) => void;
    onLongPress?: (event: any) => void;
  }
  
  export default class MapView extends React.Component<MapViewProps, any> {
    static Marker: any;
    static Polyline: any;
    static Polygon: any;
    static Circle: any;
    static Callout: any;
    static PROVIDER_GOOGLE: string;
    static PROVIDER_DEFAULT: string;
  }
}

declare module 'expo-linear-gradient' {
  import React from 'react';
  import { ViewProps } from 'react-native';
  
  export interface LinearGradientProps extends ViewProps {
    colors: string[];
    start?: { x: number; y: number } | [number, number];
    end?: { x: number; y: number } | [number, number];
    locations?: number[];
  }
  
  export const LinearGradient: React.FC<LinearGradientProps>;
}
