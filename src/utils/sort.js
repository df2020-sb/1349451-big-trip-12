const compareNullAttributes = (attributeA, attributeB) => {
  if (!attributeA && !attributeB) {
    return 0;
  }

  if (!attributeA) {
    return 1;
  }

  if (!attributeB) {
    return -1;
  }

  return null;
};


export const sortByTime = (pointA, pointB) => {
  const durationA = pointA.endDate - pointA.startDate;
  const durationB = pointB.endDate - pointB.startDate;

  let compareResult = compareNullAttributes(durationA, durationB);

  if (compareResult) {
    return compareResult;
  }
  return durationB - durationA;
};


export const sortByPrice = (pointA, pointB) => {
  let compareResult = compareNullAttributes(pointA.price, pointB.price);

  if (compareResult) {
    return compareResult;
  }
  return pointB.price - pointA.price;
};
