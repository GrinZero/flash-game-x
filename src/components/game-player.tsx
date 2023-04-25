import React, { useEffect, useRef } from "react";
import RufflePlayer from "../core";

export interface GamePlayerProps extends React.HTMLAttributes<HTMLDivElement> {
  /* 约定：public下的文件夹名即为游戏名 */
  game: string;
  /* 约定：游戏文件夹下的loader.swf为入口文件 */
  loader?: string;
}

const GamePlayer: React.FC<GamePlayerProps> = ({
  game,
  loader = "loader.swf",
  ...rest
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const base = `/${game}/`;
  const _loader = `${base}${loader}`;

  useEffect(() => {
    if (!containerRef.current) return;
    RufflePlayer.config = {
      base: base,
      autoplay: "off",
    };
    const ruffle = RufflePlayer.newest();

    const player = ruffle.createPlayer();
    containerRef.current.appendChild(player);
    player.load(_loader);

    player.style.borderRadius = "16px";
    player.style.overflow = "hidden";
    player.style.width = "100%";
    player.style.height = "100%";

    return () => {
      player.destroy();
      containerRef.current?.removeChild(player);
    };
  }, []);

  return <div ref={containerRef} {...rest}></div>;
};

export default GamePlayer;
