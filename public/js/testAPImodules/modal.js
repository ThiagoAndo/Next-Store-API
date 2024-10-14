const myModal = new bootstrap.Modal(document.getElementById("myModal"));

// <!-- Modal -->

document.querySelectorAll("#close").forEach((btn) => {
  btn.addEventListener("click", () => {
    myModal.hide();
    const token = localStorage.getItem("token");
    if (!token) {
      location.reload();
    }
  });
});

export function modal(call) {
  const id = localStorage.getItem("id");
  const email = localStorage.getItem("email");

  const cont = `EMAIL: <span class="text-primary">  ${email}</span> <br/> <br/> ID:<span class="text-primary"> ${id}</span> `;

  if (call === "user") {
    document.querySelector(".modal-title").textContent = "Last retrived user";
    document.querySelector(".modal-body").innerHTML = cont;
    document.querySelector(".modal-footer").innerHTML = `<span></span>`;
    myModal.show();
  }
}
