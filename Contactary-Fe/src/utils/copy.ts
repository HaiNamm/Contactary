export default function copy(s: string) {
  
  if (navigator.clipboard) {
    navigator.clipboard.writeText(s);
  } else {
    const el = document.createElement("textarea");
    el.value = s;
    el.setAttribute("readonly", "");
    el.style.position = "absolute";
    el.style.left = "-9999px";
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  }
}
