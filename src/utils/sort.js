const compareNullAttributes = (attributeA, attributeB) => {
  if (attributeA === null && attributeB === null) {
    return 0;
  }

  if (attributeA === null) {
    return 1;
  }

  if (attributeB === null) {
    return -1;
  }

  return null;
};


export const sortByTime = (pointA, pointB) => {
  let compareResult = compareNullAttributes(pointA.duration, pointB.duration);

  if (compareResult !== null) {
    return compareResult;
  }
  return pointB.duration - pointA.duration;
};

export const sortByPrice = (pointA, pointB) => {
  let compareResult = compareNullAttributes(pointA.price, pointB.price);

  if (compareResult !== null) {
    return compareResult;
  }
  return pointB.price - pointA.price;
};
