import { v4 as uuid } from 'uuid';
import { AccountEmail } from 'src/model/account-email';

export class Account {
  id: string;
  name: string;
  domain: string;
  created_date: Date;
  emails: AccountEmail[];

  virtual_resource_start_date: Date;
  virtual_resource_speed: number;
  virtual_resource_accrued: number;
  total_resource_spent: number;

  constructor(
      id: string,
      name: string,
      domain: string,
      created_date: Date,
      virtual_resource_start_date: Date,
      virtual_resource_speed: number,
      virtual_resource_accrued: number,
      total_resource_spent: number
    ) {
    this.id = id;
    this.name = name;
    this.domain = domain;
    this.created_date = created_date;
    this.emails = [];
    this.virtual_resource_start_date = virtual_resource_start_date;
    this.virtual_resource_speed = virtual_resource_speed;
    this.virtual_resource_accrued = virtual_resource_accrued;
    this.total_resource_spent = total_resource_spent;
  }
}