import { v4 as uuid } from 'uuid';

export class Idea {
  id: string;
  parent_id: string;
  author_id: string;
  name: string;
  content: string;
  created_date: Date;
  end_of_life: Date;

  total_life_direct: number;
  total_life_inherited: number;

  constructor(
    id: string,
    parent_id: string,
    author_id: string,
    name: string,
    content: string,
    created_date: Date,
    end_of_life: Date,
    total_life_direct: number,
    total_life_inherited: number
  ) {
    this.id = id;
    this.parent_id = parent_id;
    this.author_id = author_id;
    this.name = name;
    this.content = content;
    this.created_date = created_date;
    this.end_of_life = end_of_life;
    this.total_life_direct = total_life_direct;
    this.total_life_inherited = total_life_inherited;
  }

  static parse(plain: any): Idea {
    const result = new Idea(
      plain.id,
      plain.parent_id,
      plain.author_id,
      plain.name,
      plain.content,
      plain.created_date,
      plain.end_of_life,
      plain.total_life_direct,
      plain.total_life_inherited
    );
    return result;
  }
}