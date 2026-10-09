const versions = ["0.2.0","0.2.1","0.2.2","0.3.0","0.3.1","0.3.2","0.3.3","0.3.4","0.4.0","0.4.1","0.5.0"];
const url = new URL(location.href);
const requested = url.searchParams.get("version");
if (!requested || requested === "latest") {
  await import("./assets/index-dXp-dRcr.js");
} else {
  const version = requested.replace(/^v/, "");
  if (versions.includes(version)) {
    const target = new URL("./versions/v" + version + "/", url);
    url.searchParams.delete("version");
    target.search = url.search;
    target.hash = url.hash;
    location.replace(target.href);
  } else {
    document.body.replaceChildren();
    const panel = document.createElement("main");
    panel.style.cssText = "padding:32px;max-width:720px;margin:auto;color:#e9d6ab;font:16px/1.8 sans-serif;overflow:auto;max-height:100vh";
    const title = document.createElement("h1");
    title.textContent = "未找到这个版本";
    panel.append(title);
    for (const v of ["latest", ...versions.slice().reverse()]) {
      const link = document.createElement("a");
      link.href = "?version=" + v;
      link.textContent = v === "latest" ? "打开最新版" : "试玩 v" + v;
      link.style.cssText = "display:block;color:#b9e59c;margin:8px 0";
      panel.append(link);
    }
    document.body.append(panel);
  }
}
