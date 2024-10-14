import { createForm } from "/js/testAPImodules/createForm.js";
import { setFetch } from "/js/testAPImodules/HTTP.js";
import { mode } from "/js/testAPImodules/mode.js";

const newUser = ["first_name", "last_name", "email_address", "password"];
const getUser = ["email", "password"];
const password = ["id", "password"];
const update = ["id", "first_name", "last_name", "email_address"];
const deleteUser = ["id"];

localStorage.clear();
mode();
const myModal = new bootstrap.Modal(document.getElementById("myModal"));
const userBtn = document.querySelectorAll(".user-btn");

userBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
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
        alertId();
        createForm("user", password, "Sing in");
        setFetch("user", "password", "pc", true);
        break;
      case "update":
        alertId();
        createForm("user", update, "Sing in");
        setFetch("user", "", "pc", true);
        break;
      case "delete":
        alertId();
        createForm("user", deleteUser, "Delete");
        setFetch("user", "", "d", true);
        break;
      default:
        console.log("Something wrong with btn " + endPoint);
    }
  });
});

function alertId() {
  const id = localStorage.getItem("id");
  if (id) {
    document.querySelector(".modal-title").textContent =
      "You need to copy this id";
    document.querySelector(".modal-body").innerHTML =
      "Last id retrived from database: " +
      `<span class="text-primary">${id}</span>`;
    document.querySelector(".modal-footer").innerHTML = `<span></span>`;
    myModal.show();
  }
}

// async function handleLogin(user) {
//   // console.log(`http//localhost:8080/${endpoint}`);
//   try {
//     const response = await fetch(`${endpoint}`, {
//       method: "POST",
//       body: JSON.stringify(user),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (response.ok) {
//       const data = await response.json();
//       const print = document.querySelector(".log");

//       console.log(data);

//       const entries = Object.entries(data);
//       let style = `${"text - primary"}`;
//       if (data?.message) style = `${"text-danger"}`;

//       print.innerHTML = ` <table class="table table-sm table-dark">
//    <thead>
//         <h2 class="fs-6 mb-4">API response </h2>
//       <tr>
//       <th class="text-body-secondary" scope="col">#</th>
//       <th class="text-body-secondary" scope="col">Object key</th>
//       <th class="text-body-secondary" scope="col">Object value</th>
//     </tr>
//   </thead>
//    <tbody>
//         ${entries
//           .map((e, i) => {
//             return `

//     <tr>
//       <th class=${style} scope="row">${i + 1}</th>
//       <td> <span class=${style} > ${e[0]}:</span></td>
//       <td class= "ml-20 text-break ${style}"> ${e[1]}</td>
//     </tr>
// `;
//           })
//           .join("")}
//             </tbody></table>`;
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }
