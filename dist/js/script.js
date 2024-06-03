"use strict";
var itemId = 0;
var ItemCategory;
(function (ItemCategory) {
    ItemCategory["NEED"] = "need";
    ItemCategory["HAVE"] = "have";
})(ItemCategory || (ItemCategory = {}));
var items = [];
var addItemButton = document.querySelector(".app__add-item-button");
var clearField = function (field, type) {
    field.value = type === "input" ? "" : "need";
};
var createItem = function (itemName, itemId) {
    var li = document.createElement("li");
    li.classList.add("app__item");
    li.innerHTML = "\n    <div class=\"app__check-wrapper\">\n      <input type=\"checkbox\" id=\"app__item-name-".concat(itemId, "\" />\n      <label for=\"app__item-name-").concat(itemId, "\">").concat(itemName, "</label>\n    </div>\n    <button class=\"app__delete-item\">\n      <i class=\"bi bi-x\"></i>\n    </button>\n  ");
    var button = li.querySelector(".app__delete-item");
    button.addEventListener("click", function (event) { return removeItem(event); });
    return li;
};
var removeItem = function (event) {
    var target = event.target;
    var father = target.closest(".app__item");
    father.remove();
};
var addItem = function (itemContainer, itemName, itemCategory) {
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
window.addEventListener("DOMContentLoaded", function () {
    var itemTextInput = document.querySelector("#app__add-item");
    var itemCategorySelect = document.querySelector("#app__item-category");
    clearField(itemTextInput, "input");
    clearField(itemCategorySelect, "select");
});
addItemButton.addEventListener("click", function () {
    var needList = document.querySelector("#need-section .app__items");
    var haveList = document.querySelector("#have-section .app__items");
    var itemTextInput = document.querySelector("#app__add-item");
    var itemCategorySelect = document.querySelector("#app__item-category");
    var itemName = itemTextInput.value;
    var category = itemCategorySelect.value;
    addItem(category === ItemCategory.NEED ? needList : haveList, itemName, category);
    clearField(itemTextInput, "input");
    itemTextInput.focus();
});
//# sourceMappingURL=script.js.map