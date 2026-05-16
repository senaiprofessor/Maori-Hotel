/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type UserRole = 'Hospede' | 'Administrador' | 'Financeiro' | 'Gerente' | 'Diretores';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export const USER_CREDENTIALS: Record<UserRole, string> = {
  'Hospede': 'hospede@maori.com',
  'Administrador': 'admin@maori.com',
  'Financeiro': 'financeiro@maori.com',
  'Gerente': 'gerente@maori.com',
  'Diretores': 'diretoria@maori.com'
};

export const COMMON_PASSWORD = '123456';

export interface Booking {
  id: string;
  guestName: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  status: 'Confirmado' | 'Pendente' | 'Cancelado';
  amount: number;
}
