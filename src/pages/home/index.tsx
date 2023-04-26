import { useLoaderData } from "react-router-dom";
import { GameCard } from "@/components";
import type { GameItem } from "../../api";
import { useTitle } from "ahooks";

const HomePage = () => {
  const data = useLoaderData() as GameItem[];
  useTitle("首页");

  console.log("data", data);

  return (
    <div className="flex flex-row flex-wrap mt-8">
      {data.map((item) => (
        <GameCard
          className="mt-4 mx-2 w-[45.5%] md:h-[300px] md:w-[210px]"
          key={item.id}
          data={item}
        />
      ))}
    </div>
  );
};

export default HomePage;
