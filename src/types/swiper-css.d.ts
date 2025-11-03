// TypeScript shim for Swiper CSS subpath imports
// Fixes ts(2307) for imports like 'swiper/css/navigation'

declare module 'swiper/css';
declare module 'swiper/css/*';

