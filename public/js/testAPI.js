import { createForm } from "/js/testAPImodules/createForm.js";
import { dropDown } from "/js/testAPImodules/createDropDown.js";
import { setFetch } from "/js/testAPImodules/HTTP.js";
import { mode } from "/js/testAPImodules/mode.js";
import { modal } from "/js/testAPImodules/modal.js";

const newUser = ["first_name", "last_name", "email_address", "password"];
const getUser = ["email", "password"];
const password = ["id", "password"];
const update = ["id", "first_name", "last_name", "email_address"];
const deleteUser = ["id"];
const newProduct = [
  "id",
  "title",
  "description",
  "price",
  "discountPercentage",
  "rating",
  "stock",
  "brand",
  "category",
  "thumbnail",
  "image_1",
  "image_2",
];

// localStorage.clear();
mode();

const userBtn = document.querySelectorAll(".user-btn");
const proBtn = document.querySelectorAll(".pro-btn");

userBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    const id = localStorage.getItem("id");

    const endPoint = btn.getAttribute("id");
    switch (endPoint) {
      case "get":
        createForm("user", getUser, "Sing in");
        setFetch("user", "get", "p", false);
        break;
      case "new":
        createForm("user", newUser, "Sing up");
        setFetch("user", "new", "p", false);
        break;
      case "password":
        id && modal("user");
        createForm("user", password, "Sing in");
        setFetch("user", "password", "pc", true);
        break;
      case "update":
        id && modal("user");
        createForm("user", update, "Sing in");
        setFetch("user", "", "pc", true);
        break;
      case "delete":
        id && modal("user");
        createForm("user", deleteUser, "Delete");
        setFetch("user", "", "d", true);
        break;
      default:
        console.log("Something wrong with btn " + endPoint);
    }
  });
});

proBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    const id = localStorage.getItem("id");

    const endPoint = btn.getAttribute("id");
    switch (endPoint) {
      case "all":
        createForm("pro", [], "Fetch");
        setFetch("product", "", "g", false);
        break;
      case "category":
        createForm("pro", [], "Fetch");
        setFetch("product", "categories", "g", false);
        break;
      case "byC":
        setFetch("product", "", "g", false);
        dropDown();
        break;
      case "byI":
        createForm("pro", deleteUser, "Fetch", "products/byid/");
        setFetch("product", "byid/", "g", false);
        break;
      case "new":
        createForm("pro", newProduct, "New product");
        setFetch("product", "", "p", true);
        break;
      case "delete":
        createForm("pro", deleteUser, "Delete", "products/");
        setFetch("product", "", "d", true);
        break;
      default:
        console.log("Something wrong with btn " + endPoint);
    }
  });
});
