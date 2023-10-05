import { User } from "./user.model";

export class Blog {
  _id!: string;
  title!: string;
  content!: string;
  postDate!: Date;
  createdAt!: Date;
  comments!: any
  text!: string;
}

export class Comment {
  text!: string;
  user!: string;
}
