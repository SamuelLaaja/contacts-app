export class User {
  constructor(firstName: string, lastName: string, nickName: string, password: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.nickName = nickName;
    this.password = password;
  }
  firstName: string;
  lastName: string;
  nickName: string;
  password: string;

}
