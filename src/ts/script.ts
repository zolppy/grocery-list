let itemId: number = 0;

interface IItem {
  id: number;
  name: string;
  category: string;
}

enum ItemCategory {
  NEED = "need",
  HAVE = "have",
}

const items: IItem[] = [];

const addItemButton = document.querySelector(
  ".app__add-item-button"
) as HTMLButtonElement;

const clearField = (
  field: HTMLInputElement | HTMLSelectElement,
  type: string
) => {
  field.value = type === "input" ? "" : "need";
};

const createItem = (itemName: string, itemId: number): HTMLLIElement => {
  const li = document.createElement("li");

  li.classList.add("app__item");
  li.innerHTML = `
    <div class="app__check-wrapper">
      <input type="checkbox" id="app__item-name-${itemId}" />
      <label for="app__item-name-${itemId}">${itemName}</label>
    </div>
    <button class="app__delete-item">
      <i class="bi bi-x"></i>
    </button>
  `;

  const button = li.querySelector(".app__delete-item") as HTMLButtonElement;

  button.addEventListener("click", (event) => removeItem(event));

  return li;
};

const removeItem = (event: MouseEvent) => {
  const target = event.target as HTMLButtonElement;
  const father = target.closest(".app__item") as HTMLLIElement;

  father.remove();
};

const addItem = (
  itemContainer: HTMLUListElement,
  itemName: string,
  itemCategory: string
) => {
  if (!itemContainer.querySelector("li")) {
    itemContainer.textContent = "";
  }

  items.push({
    id: itemId,
    name: itemName,
    category: itemCategory,
  });

  itemContainer.appendChild(createItem(itemName, ++itemId));
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
});

addItemButton.addEventListener("click", () => {
  const needList = document.querySelector(
    "#need-section .app__items"
  ) as HTMLUListElement;
  const haveList = document.querySelector(
    "#have-section .app__items"
  ) as HTMLUListElement;
  const itemTextInput = document.querySelector(
    "#app__add-item"
  ) as HTMLInputElement;
  const itemCategorySelect = document.querySelector(
    "#app__item-category"
  ) as HTMLSelectElement;
  const itemName = itemTextInput.value;
  const category = itemCategorySelect.value;

  addItem(
    category === ItemCategory.NEED ? needList : haveList,
    itemName,
    category
  );

  clearField(itemTextInput, "input");
  itemTextInput.focus();
});
