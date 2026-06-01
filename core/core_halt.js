// ⭐ Zentrales halt() – für alle Seiten
window.halt = function halt(eventName = "event", extra = {}) {
  const lastEvent = {
    clone: extra.clone || (window.PAGE_ID || "?"),
    anchor: extra.anchor || (window.PAGE_ANCHOR || "PI"),
    event: eventName,
    time: Date.now(),
    ...extra
  };

  if (window.NAVI && typeof NAVI.onEvent === "function") {
    NAVI.onEvent(lastEvent);
  }

  if (window.BigCube && typeof BigCube.onEvent === "function") {
    BigCube.onEvent(lastEvent);
  }

  return lastEvent;
};

