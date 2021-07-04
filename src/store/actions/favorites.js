export function setFavorites(favorites) {
  return {
    type: "@favorites/SET",
    favorites,
  };
}

export function clearFavorites() {
  return {
    type: "@favorites/CLEAR"
  };
}