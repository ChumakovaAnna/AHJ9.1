/* eslint-disable class-methods-use-this */
export default class WorkDisplay {
  constructor() {
    this.tableTickets = document.querySelector("#tickets-list");
  }

  redrawGoods(arrTicket) {
    this.tableTickets.innerHTML = "";
    for (const item of arrTicket) {
      const itemDate = new Date(item.created);
      const date = this.convertDate(itemDate.getDate());
      const month = this.convertDate(itemDate.getMonth() + 1);
      const year = this.convertDate(itemDate.getFullYear());
      const hours = this.convertDate(itemDate.getHours());
      const minute = this.convertDate(itemDate.getMinutes());
      const itemCreated = `${date}.${month}.${year} ${hours}:${minute}`;
      const ticket = document.createElement("div");
      ticket.className = "ticket";
      ticket.dataset.id = item.id;
      ticket.innerHTML = `
      <div class="grid-noGutter">
        <div class="col-1">
          <button class="status" data-status="${item.status}"></button>
        </div>
        <div class="col">
          <div class="td-name">${item.name}</div>
        </div>
        <div class="col">
          <div class="td-created">${itemCreated}</div>
        </div>
        <div class="col-1">
          <div class="change-del">
            <button class="edit">
              <img src="src/img/edit.png" data-btn="edit" alt="add">
            </button>
            <button class="delete">
              <img src="src/img/delete.png" data-btn="delete" alt="add">
            </button>
          </div>
        </div>
      </div>
      `;
      this.tableTickets.appendChild(ticket);
    }
  }

  convertDate(value) {
    const rValue = value < 10 ? `0${value}` : value;
    return rValue;
  }
}
