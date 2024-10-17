import { handleHTTP } from "/js/userIterfaceModules/HTTP.js";
let url = null;
let form = null;

export async function createForm(id, inp, btnText, hasUrl = false) {
  form = document.querySelector("#" + id);
  url = hasUrl;
  let content = null;
  content = `
       ${inp
         .map((i) => {
           return `<div class="form-floating mb-3">
                     <input type=${i} class="form-control" id=${i} name=${i} 
                      placeholder=${tidyHolder(i)} required>
                      <label for=${i}>${tidyHolder(i)}</label>
                  </div>`;
         })
         .join("")}
          <button class="w-100 btn btn-lg btn-primary" type="submit">${btnText}</button>
          <hr class="my-4">
          <div class=log${id}>`;
  form.addEventListener("submit", handleEvent);
  form.innerHTML = content;
}

function handleEvent(e) {
  e.preventDefault();
  formData(form);
}

function formData(form) {
  //Expecting images from products
  let myObj = {
    images: [],
  };
  const arr = [];
  const formData = new FormData(form);
  const obj = Object.fromEntries(formData);

  // Identifing data of forma new product and mounting the product obj
  if (obj?.image_1) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (!key.includes("image")) {
          myObj[key] = obj[key];
        } else {
          myObj.images.push(obj[key]);
        }
      }
    }
    // Identifing data of form add item to cart and mounting the cart obj
  } else if (obj?.product_id && obj?.quantity) {
    const { user_id } = obj;
    const { name, price, product_id, quantity } = obj;
    myObj = { user_id, item: { name, price, id: product_id, quantity } };
    // Identifing data of form delete item from cart and update item quantity
  } else if (obj?.item_id) {
    const { user_id } = obj;
    const { item_id } = obj;
    const { quantity } = obj;

    quantity
      ? (myObj = {
          cart: {
            user_id,
            item_id,
            quantity,
          },
        })
      : (myObj = {
          cart: {
            user_id,
            item_id,
          },
        });
  } else {
    myObj = obj;
  }
  if (url) {
    let route = null;
    // Mounting the cart purchased dynamic routes
    if (Object.keys(obj).length > 1) {
      route =
        Object.keys(obj)[0] +
        "=" +
        Object.values(obj)[0] +
        "&" +
        Object.keys(obj)[1] +
        "=" +
        Object.values(obj)[1];
    } else {
      // Mounting others dynamic routes
      const [key] = Object.keys(obj);
      route = obj[key];
    }
    //calling function for dynamic routes
    handleHTTP(null, url + route, true);
  } else {
    handleHTTP(myObj, undefined, true);
  }
}

export function tidyHolder(i) {
  return i.includes("_")
    ? i.split("_")[0].slice(0, 1).toUpperCase() +
        i.split("_")[0].slice(1, i.split("_")[0].length) +
        " " +
        i.split("_")[1]
    : i.slice(0, 1).toUpperCase() + i.slice(1, i.length);
}
