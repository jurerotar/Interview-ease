import translations from '@i18n/common.json';

type Obj = Record<string, any>;

const resolvePath = (object: Obj, path: string): string => {
  return path
    .split(/[.[\]'"]/)
    .filter((p) => p)
    .reduce((o, p) => (o ? o[p] : path), object) as unknown as string;
};

const t = (path: string, replaces?: Record<string, string | number>): string => {
  let translation = resolvePath(translations, path);
  if (replaces) {
    Object.keys(replaces).forEach((key: string) => {
      translation = translation.replaceAll(`{${key}}`, `${replaces[key]}`);
    });
  }
  return translation;
};

const useTranslation = () => {
  return {
    t
  };
};

export default useTranslation;
