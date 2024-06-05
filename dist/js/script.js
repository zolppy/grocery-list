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
var checkIsEmpty = function () {
    var one = document.querySelector("#need-section");
    var two = document.querySelector("#have-section");
    if (items.find(function (item) { return item.checked === false; })) {
        one.classList.remove("hidden");
    }
    else {
        one.classList.add("hidden");
    }
    if (items.find(function (item) { return item.checked === true; })) {
        two.classList.remove("hidden");
    }
    else {
        two.classList.add("hidden");
    }
};
var createItem = function (item) {
    var li = document.createElement("li");
    var input = item.checked
        ? "<input type=\"checkbox\" id=\"input-".concat(item.id, "\" checked />")
        : "<input type=\"checkbox\" id=\"input-".concat(item.id, "\" />");
    li.classList.add("app__item");
    li.id = item.id;
    li.innerHTML = "\n    <div class=\"app__check-wrapper\">\n      ".concat(input, "\n      <label for=\"input-").concat(item.id, "\">").concat(item.name, "</label>\n    </div>\n    <button class=\"app__delete-item\">\n      <svg\n        xmlns=\"http://www.w3.org/2000/svg\"\n        width=\"22\"\n        height=\"22\"\n        fill=\"currentColor\"\n        class=\"app__trash-icon\"\n        viewBox=\"0 0 16 16\"\n      >\n        <path\n          d=\"M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5\"\n        />\n      </svg>\n    </button>\n  ");
    var button = li.querySelector(".app__delete-item");
    var liInput = li.querySelector("input");
    button.addEventListener("click", function () {
        removeItem(item);
        saveItems(KEY);
        checkIsEmpty();
    });
    liInput.addEventListener("input", function () {
        var updateItems = function () {
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
            checkIsEmpty();
        };
        updateItems();
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
    checkIsEmpty();
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
    checkIsEmpty();
    clearField(itemTextInput, "input");
    itemTextInput.focus();
});
//# sourceMappingURL=script.js.map