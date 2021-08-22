import { uuid } from "uuidv4";

export default class Ticket {
  constructor(name, description) {
    this.id = uuid();
    this.name = name;
    this.description = description;
    this.status = false;
    this.created = new Date().toLocaleString();
  }
}
