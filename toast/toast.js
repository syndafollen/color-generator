export const generateToast = ({
  columnId,
  message,
  backgroundColor = "#4682B4",
  color = "#fffffe",
  length = "2000ms"
}) => {
  const column = document.querySelector(`div[id=container${columnId}]`);

  column.insertAdjacentHTML(
    "afterbegin",
    `<p class='toast'
        style="background-color: ${backgroundColor};
        color: ${color};
        animation-duration: ${length}">
        ${message}
        </p>`
  );
  const toast = document.querySelector(".toast");
  toast.addEventListener("animationend", () => {
    toast.remove();
  });
};
