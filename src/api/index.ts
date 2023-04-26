export interface GameItem {
  id: number;
  key: string;
  name: string;
  loader?: string;
  src: string;
}
export const GAME_LIST: GameItem[] = [
  {
    id: 1,
    key: "bvn17",
    name: "死神vs火影 v1.7",
    src: "/bvn17/index.jpg",
  },
  {
    id: 2,
    key: "bvn24",
    name: "死神vs火影 v2.4",
    src: "/bvn24/index.png",
  },
  {
    id: 4,
    key: "gold-kg",
    name: "黄金矿工",
    src: "/gold-kg/index.png",
  },
];

export const getGameList = async () => {
  return GAME_LIST;
};
