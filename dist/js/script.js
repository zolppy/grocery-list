"use strict";
var KEY = "items";
var ID_LENGTH = 4;
var items = [];
var ItemCategory;
(function (ItemCategory) {
    ItemCategory["NEED"] = "need";
    ItemCategory["HAVE"] = "have";
})(ItemCategory || (ItemCategory = {}));
var saveItems = function (key) {
    return localStorage.setItem(key, JSON.stringify(items));
};
var loadItems = function () {
    var arr = JSON.parse(localStorage.getItem(KEY));
    if (arr) {
        arr.forEach(function (itm) {
            items.push(itm);
        });
    }
    items.map(function (item) { return addItem(item); });
};
var generateUUID = function (ID_LENGTH) {
    var id = "X";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 1; i < ID_LENGTH; i++) {
        id += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return id;
};
var addItemButton = document.querySelector(".app__add-item-button");
var clearField = function (field, type) {
    field.value = type === "input" ? "" : "need";
};
var createItem = function (item) {
    var li = document.createElement("li");
    var input = item.checked
        ? "<input type=\"checkbox\" id=\"input-".concat(item.id, "\" checked />")
        : "<input type=\"checkbox\" id=\"input-".concat(item.id, "\" />");
    li.classList.add("app__item");
    li.id = item.id;
    li.innerHTML = "\n    <div class=\"app__check-wrapper\">\n      ".concat(input, "\n      <label for=\"input-").concat(item.id, "\">").concat(item.name, "</label>\n    </div>\n    <button class=\"app__delete-item\">\n      <i class=\"bi bi-x\"></i>\n    </button>\n  ");
    var button = li.querySelector(".app__delete-item");
    var liInput = li.querySelector("input");
    button.addEventListener("click", function () {
        removeItem(item);
        saveItems(KEY);
    });
    liInput.addEventListener("input", function () {
        var id = item.id, name = item.name, checked = item.checked;
        var arrItem = items === null || items === void 0 ? void 0 : items.find(function (item) { return item.id === id; });
        var element = document.querySelector("#".concat(id));
        element === null || element === void 0 ? void 0 : element.remove();
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
var removeItem = function (item) {
    var id = item.id;
    var element = document.querySelector("#".concat(id));
    var temp = items.filter(function (item) { return item.id !== id; });
    while (items.length) {
        items.pop();
    }
    temp.forEach(function (item) {
        items.push(item);
    });
    element === null || element === void 0 ? void 0 : element.remove();
};
var addItem = function (item) {
    var category = item.checked ? "have" : "need";
    var itemContainer = document.querySelector("#".concat(category, "-section .app__items"));
    if (!itemContainer.querySelector("li")) {
        itemContainer.textContent = "";
    }
    itemContainer.appendChild(createItem(item));
};
window.addEventListener("DOMContentLoaded", function () {
    var itemTextInput = document.querySelector("#app__add-item");
    var itemCategorySelect = document.querySelector("#app__item-category");
    clearField(itemTextInput, "input");
    clearField(itemCategorySelect, "select");
    loadItems();
});
addItemButton.addEventListener("click", function () {
    var itemTextInput = document.querySelector("#app__add-item");
    var itemCategorySelect = document.querySelector("#app__item-category");
    var itemName = itemTextInput.value;
    var itemCategory = itemCategorySelect.value;
    var item = {
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
//# sourceMappingURL=script.js.map