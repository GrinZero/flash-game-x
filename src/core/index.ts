export interface RufflePlayerSource {
  createPlayer: () => HTMLElement & {
    load: (url: string) => void;
    destroy: () => void;
  };
  version: string;
  polyfill: () => void;
  pluginPolyfill: () => void;
}

export interface RufflePlayerType {
  config?: {
    base?: string;
    publicPath?: string;
    fullscreenEnabled?: boolean;
    autoplay?: "auto" | "off" | "on";
  };
  newestName?: string;
  newest: () => RufflePlayerSource;
  sources?: RufflePlayerSource[];
}

const RufflePlayer = window.RufflePlayer as RufflePlayerType;

export default RufflePlayer;
