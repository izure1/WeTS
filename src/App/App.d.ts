import Vue from 'vue';
import Scene from '@/Scene/Scene';
import Scene3d from '@/Scene/Scene3d';
declare class WeApp extends Scene3d {
    private width;
    private height;
    private perspective;
    private app;
    element: string | null;
    constructor();
    get appElement(): Element | null;
    get size(): [number, number];
    set size(v: [number, number]);
    start(splashScene?: Scene): Promise<Vue>;
    destroy(): Promise<void>;
    fullscreen(): Promise<void>;
    exitFullscreen(): Promise<void>;
}
export default WeApp;
