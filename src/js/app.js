import WorkDisplay from "./WorkDisplay";
import Popovers from "./Popovers";
import ConfirmDel from "./ConfirmDel";
import XHR from "./XHR";
import TicketsList from "./Server/TicketsList";

const workDisplay = new WorkDisplay();
const popup = new Popovers(document.body);
const confirmDel = new ConfirmDel();
const xhrClass = new XHR();

const ticketsList = new TicketsList();
ticketsList.add("First", "Sample for testing");
ticketsList.add("Second", "Sample for testing two");

class Work {
  constructor() {
    this.tableGoods = document.querySelector("#tickets-list");
    this.elAddProduct = document.querySelector("#add");
    this.id = null;
    this.itemIndex = null;
  }

  async init() {
    const arrTickets = await xhrClass.getTickets();

    // const arrTickets = ticketsList.allTickets();
    workDisplay.redrawGoods(arrTickets);

    popup.bindToDOM();
    popup.saveProduct(this.saveProduct.bind(this));
    this.inputName = document.querySelector("#name");
    this.inputDescription = document.querySelector("#description");
    this.popupTitle = document.querySelector("#title-popup");
    confirmDel.init();
    this.eventsGoods();
  }

  eventsGoods() {
    this.tableGoods.addEventListener("click", async (event) => {
      const eClass = event.target.classList;
      this.id = event.target.closest(".item-ticket").dataset.id;
      // change status
      if (eClass.contains("change-status")) {
        const itemStatus = event.target.dataset.status;
        const sendStatus = itemStatus === "true" ? "false" : "true";
        await xhrClass.changeStatus(this.id, sendStatus);
        const arrTickets = await xhrClass.getTickets();
        workDisplay.redrawGoods(arrTickets);
      }

      // change add
      if (eClass.contains("change-ticket")) {
        const itemName = event.target.closest(".item-ticket").querySelector(".td-name").innerText;
        const description = await xhrClass.getDescription(this.id);
        this.inputName.value = itemName;
        this.inputDescription.value = description;
        this.popupTitle.innerText = "Изменить тикет";
        popup.showPopup();
      }
      // delete product
      if (eClass.contains("del-ticket")) {
        confirmDel.delElement(this.delProduct.bind(this));
      }
      // get description
      if (eClass.contains("td-name")) {
        const itemDescription = event.target.parentNode.querySelector(".description");
        if (!itemDescription) {
          const description = await xhrClass.getDescription(this.id);
          const elDescription = document.createElement("div");
          elDescription.className = "description";
          elDescription.innerHTML = `
          <p>${description}</p>
          `;
          event.target.parentNode.appendChild(elDescription);
        } else {
          itemDescription.classList.toggle("hidden");
        }
      }
    });

    this.elAddProduct.addEventListener("click", () => {
      this.id = null;
      this.popupTitle.innerText = "Добавить тикет";
      popup.showPopup();
    });
  }

  async delProduct() {
    await xhrClass.delTicket(this.id);
    const arrTickets = await xhrClass.getTickets();
    workDisplay.redrawGoods(arrTickets);
  }

  async saveProduct() {
    if (this.id !== null) {
      // change
      await xhrClass.changeTickets(this.id, this.inputName.value, this.inputDescription.value);
    } else {
      // save new
      await xhrClass.addTicket(this.inputName.value, this.inputDescription.value);
    }
    const arrTickets = await xhrClass.getTickets();
    workDisplay.redrawGoods(arrTickets);
  }
}

const work = new Work();
work.init();
