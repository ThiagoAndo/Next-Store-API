import { handleHTTP } from "/js/testAPImodules/HTTP.js";
export async function createForm(id, inp, btnText, hasUrl = false) {
  const form = document.querySelector("#" + id);
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
    formData(form, hasUrl);
  });
  form.innerHTML = content;
}

function formData(form, hasUrl) {
  let myObj = {
    images: [],
  };
  const arr = [];
  const formData = new FormData(form);
  const obj = Object.fromEntries(formData);

  const [key] = Object.keys(obj);
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
    // console.log(myObj);
  } else {
    myObj = obj;
  }

  handleHTTP(
    hasUrl ? null : myObj,
    hasUrl ? hasUrl + obj[key] : undefined,
    true
  );
}

export function tidyHolder(i) {
  return i.includes("_")
    ? i.split("_")[0].slice(0, 1).toUpperCase() +
        i.split("_")[0].slice(1, i.split("_")[0].length) +
        " " +
        i.split("_")[1]
    : i.slice(0, 1).toUpperCase() + i.slice(1, i.length);
}
