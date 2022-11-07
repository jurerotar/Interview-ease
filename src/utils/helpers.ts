export const removePropertyDeep = <T>(object: T, property: string) => {
  return JSON.parse(JSON.stringify(object, (k, v) => (k === property ? undefined : v)));
};

export const removeExtensionFromName = (name: string): string => {
  return name.substring(0, name.lastIndexOf('.'));
};
