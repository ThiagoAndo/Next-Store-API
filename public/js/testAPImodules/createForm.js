import { handleHTTP } from "/js/testAPImodules/HTTP.js";

let url = null;
export async function createForm(id, inp, btnText, hasUrl = false) {
  const form = document.querySelector("#" + id);
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

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    formData(form);
  });
  form.innerHTML = content;
}

function formData(form) {
  let myObj = {
    images: [],
  };
  const arr = [];
  const formData = new FormData(form);
  const obj = Object.fromEntries(formData);

  const [key] = Object.keys(obj);
  // Identifing new product and mounting the product obj
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
  } else {
    myObj = obj;
  }
  // console.log(myObj);
  if (url) {
    handleHTTP(null, url + obj[key], true);
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
