import { handleHTTP } from "/js/testAPImodules/HTTP.js";
import { tidyHolder } from "/js/testAPImodules/createForm.js";

export async function dropDown() {
  const form = document.querySelector("#pro");

  const response = await handleHTTP(null, "products/categories");
  const content = ` <div class="dropup">
      <button
        type="button"
        class="btn btn-primary dropdown-toggle"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        Categories
      </button>
      <div class="dropdown-menu">
         ${response
           .map((res) => {
             return `  <p class="dropdown-item" value= products/bycategories?category=${
               res.category
             }> ${tidyHolder(res.category)}</p>`;
           })
           .join("")}
      
      </div>
    </div>
    <br/>
    <div class=logpro>`;
  form.innerHTML = content;
  document.querySelectorAll(".dropdown-item").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const cat = btn.getAttribute("value");
      handleHTTP(null, cat, true);
    });
  });
}
