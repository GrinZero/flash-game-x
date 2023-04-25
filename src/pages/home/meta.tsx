import { getGameList } from "../../api";

export default {
  title: "首页",
  id: "home",
  loader: async () => {
    return getGameList();
  },
};
