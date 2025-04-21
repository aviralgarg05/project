import React from 'react';
import { View, Text } from 'react-native';

// Main component mock
const MapView = props => {
  return (
    <View {...props} style={[{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#e0e0e0', height: 300 }, props.style]}>
      <Text>Map View (Mocked)</Text>
      {props.children}
    </View>
  );
};

// Mock all the necessary sub-components
MapView.Marker = props => <View {...props}>{props.children}</View>;
MapView.Callout = props => <View {...props}>{props.children}</View>;
MapView.Polygon = props => <View {...props} />;
MapView.Polyline = props => <View {...props} />;
MapView.Circle = props => <View {...props} />;

// Add required constants
MapView.PROVIDER_GOOGLE = 'google';
MapView.PROVIDER_DEFAULT = 'default';

// Mock the problematic native component
const MapMarkerNativeComponent = () => <View />;
export { MapMarkerNativeComponent };

export default MapView;
