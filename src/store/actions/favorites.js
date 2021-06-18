export function setFavorites(favorites) {
  return {
    type: "@favorites/SET",
    favorites,
  };
}