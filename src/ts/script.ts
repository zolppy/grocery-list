const KEY: string = "items";
const ID_LENGTH: number = 4;
const items: IItem[] = [];

interface IItem {
  id: string;
  name: string;
  checked: boolean;
}

enum ItemCategory {
  NEED = "need",
  HAVE = "have",
}

const saveItems = (key: string) =>
  localStorage.setItem(key, JSON.stringify(items));

const loadItems = () => {
  const arr: any = JSON.parse(localStorage.getItem(KEY) as string);

  if (arr) {
    arr.forEach((itm: IItem) => {
      items.push(itm);
    });
  }

  items.map((item) => addItem(item));
};

const generateUUID = (ID_LENGTH: number): string => {
  let id: string = "X"; // pois id não pode começar por número
  const characters: string =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 1; i < ID_LENGTH; i++) {
    id += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return id;
};

const addItemButton = document.querySelector(
  ".app__add-item-button"
) as HTMLButtonElement;

const clearField = (
  field: HTMLInputElement | HTMLSelectElement,
  type: string
) => {
  field.value = type === "input" ? "" : "need";
};

const createItem = (item: IItem): HTMLLIElement => {
  const li = document.createElement("li");

  const input: string = item.checked
    ? `<input type="checkbox" id="input-${item.id}" checked />`
    : `<input type="checkbox" id="input-${item.id}" />`;

  li.classList.add("app__item");
  li.id = item.id;
  li.innerHTML = `
    <div class="app__check-wrapper">
      ${input}
      <label for="input-${item.id}">${item.name}</label>
    </div>
    <button class="app__delete-item">
      <i class="bi bi-x"></i>
    </button>
  `;

  const button = li.querySelector(".app__delete-item") as HTMLButtonElement;
  const liInput = li.querySelector("input") as HTMLInputElement;

  button.addEventListener("click", () => {
    removeItem(item);
    saveItems(KEY);
  });

  liInput.addEventListener("input", () => {
    const { id, name, checked }: IItem = item;
    const arrItem: IItem | undefined = items?.find(
      (item: IItem) => item.id === id
    );

    const element = document.querySelector(`#${id}`);
    element?.remove();

    if (arrItem) {
      arrItem.id = id;
      arrItem.name = name;
      arrItem.checked = !checked;
      addItem(arrItem);
    }

    saveItems(KEY);
  });

  return li;
};

const removeItem = (item: IItem) => {
  const { id }: IItem = item;
  const element = document.querySelector(`#${id}`);
  const temp: IItem[] = items.filter((item) => item.id !== id);

  while (items.length) {
    items.pop();
  }

  temp.forEach((item) => {
    items.push(item);
  });

  element?.remove();
};

const addItem = (item: IItem) => {
  const category = item.checked ? "have" : "need";

  const itemContainer = document.querySelector(
    `#${category}-section .app__items`
  ) as HTMLUListElement;

  if (!itemContainer.querySelector("li")) {
    itemContainer.textContent = "";
  }

  itemContainer.appendChild(createItem(item));
};

window.addEventListener("DOMContentLoaded", () => {
  const itemTextInput = document.querySelector(
    "#app__add-item"
  ) as HTMLInputElement;
  const itemCategorySelect = document.querySelector(
    "#app__item-category"
  ) as HTMLSelectElement;

  clearField(itemTextInput, "input");
  clearField(itemCategorySelect, "select");

  loadItems();
});

addItemButton.addEventListener("click", () => {
  const itemTextInput = document.querySelector(
    "#app__add-item"
  ) as HTMLInputElement;
  const itemCategorySelect = document.querySelector(
    "#app__item-category"
  ) as HTMLSelectElement;
  const itemName = itemTextInput.value;
  const itemCategory = itemCategorySelect.value;

  const item: IItem = {
    id: generateUUID(ID_LENGTH),
    name: itemName,
    checked: itemCategory === ItemCategory.HAVE,
  };

  addItem(item);
  items.push(item);
  saveItems(KEY);

  clearField(itemTextInput, "input");
  itemTextInput.focus();
});
