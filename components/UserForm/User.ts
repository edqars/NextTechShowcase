export interface IUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  username: string;
  website: string;
}

export class UserDTORequest {
  id: number;

  name: string;

  email: string;

  phone: string;

  username: string;

  website: string;

  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.username = data.username;
    this.email = data.email;
    this.phone = data.phone;
    this.website = data.website;
  }
}
