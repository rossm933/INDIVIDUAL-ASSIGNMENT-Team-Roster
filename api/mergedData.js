import { getPlayers } from './playerData';

const searchPlayers = async (uid, searchValue) => {
  const allPlayers = await getPlayers(uid);
  const filteredPlayers = await allPlayers.filter((member) => (
    member.name.toLowerCase().includes(searchValue)
    || member.role.toLowerCase().includes(searchValue)
  ));

  return { members: filteredPlayers };
};

export default searchPlayers;
