export function setRooms(rooms) {
  return {
    type: "@rooms/SET",
    rooms,
  };
}

export function clearRooms() {
  return {
    type: "@rooms/CLEAR",
  };
}