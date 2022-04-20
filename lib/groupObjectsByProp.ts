const groupBy = (key: string) => (array: any) =>
  array.reduce((objectsByKeyValue: any, obj: any) => {
    const value = obj[key];
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
    return objectsByKeyValue;
  }, {});

export default groupBy;

// Courtesy of Jamie Mason (https://gist.github.com/JamieMason/0566f8412af9fe6a1d470aa1e089a752)
