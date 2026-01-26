import { demoAccounts } from '@/data/demoAccounts';

export const loginDemo = (username: string, password: string) => {
  return demoAccounts.find(
    acc => acc.username === username && acc.password === password
  );
};
