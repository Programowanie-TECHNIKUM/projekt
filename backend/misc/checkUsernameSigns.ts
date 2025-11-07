export default async (username: string): Promise<boolean> => {
  const validSigns = /^[a-zA-Z0-9]+$/;
  return validSigns.test(username);
};
