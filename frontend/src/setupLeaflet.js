// Centralized Leaflet setup to ensure marker icons load correctly in Vite builds
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Merge options so that the default icon URLs point to bundled assets
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Debug: print the resolved icon URLs so we can verify the bundler paths
// (remove or silence this in production)
try {
  // eslint-disable-next-line no-console
  console.info('Leaflet icon URLs:', {
    iconRetinaUrl: L.Icon.Default.prototype.options.iconRetinaUrl,
    iconUrl: L.Icon.Default.prototype.options.iconUrl,
    shadowUrl: L.Icon.Default.prototype.options.shadowUrl,
  });
} catch (e) {
  // ignore
}

export default L;
