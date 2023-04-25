import { useParams } from "react-router-dom";
import { GAME_LIST } from "../../../api";
import { GamePlayer } from "../../../components";
import { Result } from "antd";
import { useEffect } from "react";
import { useTitle } from "ahooks";

const GamePage = () => {
  const { key } = useParams<{ key: string }>();
  const item = GAME_LIST?.find((i) => i.key === key);

  useTitle(item?.name || "游戏");

  const empty = (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the game you visited does not exist."
    />
  );

  useEffect(() => {
    console.log("RufflePlayer", window.RufflePlayer);
  }, []);

  if (!GAME_LIST) return empty;
  if (!item) return empty;

  return (
    <div className="mt-3 w-full flex flex-col items-center">
      <span className="text-base font-bold mb-2 w-[700px]">{item.name}</span>
      <GamePlayer className="w-[700px] h-[525px]" game={key!} />
    </div>
  );
};
export default GamePage;
