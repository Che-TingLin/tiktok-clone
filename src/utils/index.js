export const typeList = [
  { label: 'Following', value: 'following' },
  { label: 'For You', value: 'forYou' },
];

export const typeIndexInitiator = (() => {
  const typeIndex = {};
  typeList.forEach((type) => {
    typeIndex[type.value] = 0;
  });
  return typeIndex;
})();
