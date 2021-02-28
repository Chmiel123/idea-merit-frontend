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

  available_resource() {
    let time = 0.0;
    if (this.virtual_resource_speed > 0) {
      time = (new Date().getTime() - this.virtual_resource_start_date.getTime()) * this.virtual_resource_speed / 1000.0 / 60.0 / 60.0;
    }
    return time + this.virtual_resource_accrued;
  }

  static parse(plain: any): Account {
    const result = new Account(
      plain.id,
      plain.name,
      plain.domain,
      new Date(plain.created_date),
      new Date(plain.virtual_resource_start_date),
      plain.virtual_resource_speed,
      plain.virtual_resource_accrued,
      plain.total_resource_spent
    );
    if (plain.emails) {
      plain.emails.forEach((element: any) => {
        result.emails.push(AccountEmail.parse(element))
      });
    }
    return result;
  }
}