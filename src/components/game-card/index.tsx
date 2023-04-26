import React from "react";
import type { GameItem } from "@/api";
import { Link } from "react-router-dom";
import classNames from "classnames";

export interface GameCardProps {
  data: GameItem;
  className?: string;
}
const GameCard: React.FC<GameCardProps> = ({ data, className = "" }) => {
  return (
    <Link
      className={classNames(
        "relative rounded-2xl overflow-hidden",
        "bg-[var(--theme-bg-color)]",
        className
      )}
      key={data.id}
      to={`/game/${data.key}`}
    >
      <div
        className="w-full h-0 pb-[110%]"
        style={{
          background: `url(${data.src}) no-repeat center bottom/cover`,
        }}
      ></div>
      <div className="py-3 text-center">{data.name}</div>
    </Link>
  );
};

export default GameCard;
