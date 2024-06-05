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
  const arr: IItem[] | undefined = JSON.parse(
    localStorage.getItem(KEY) as string
  );

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

const checkIsEmpty = () => {
  const one = document.querySelector("#need-section") as HTMLUListElement;
  const two = document.querySelector("#have-section") as HTMLUListElement;

  if (items.find((item) => item.checked === false)) {
    one.classList.remove("hidden");
  } else {
    one.classList.add("hidden");
  }

  if (items.find((item) => item.checked === true)) {
    two.classList.remove("hidden");
  } else {
    two.classList.add("hidden");
  }
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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        fill="currentColor"
        class="app__trash-icon"
        viewBox="0 0 16 16"
      >
        <path
          d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"
        />
      </svg>
    </button>
  `;

  const button = li.querySelector(".app__delete-item") as HTMLButtonElement;
  const liInput = li.querySelector("input") as HTMLInputElement;

  button.addEventListener("click", () => {
    removeItem(item);
    saveItems(KEY);
    checkIsEmpty();
  });

  liInput.addEventListener("input", () => {
    const updateItems = () => {
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
      checkIsEmpty();
    };

    updateItems();
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
  checkIsEmpty();
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
  checkIsEmpty();

  clearField(itemTextInput, "input");
  itemTextInput.focus();
});
