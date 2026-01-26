export interface DemoAccount {
  username: string;
  password: string;
  role: 'Admin' | 'Staff';
}

export const demoAccounts: DemoAccount[] = [
  {
    username: 'admin',
    password: '123456',
    role: 'Admin',
  },
  {
    username: 'staff',
    password: '123456',
    role: 'Staff',
  },
];
