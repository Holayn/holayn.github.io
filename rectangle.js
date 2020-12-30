const PANEL_FONT_COLOR = "#4A4E69";
const PANEL_FONT_COLOR_HOVER = "#F2E9E4";

export const drawRectangle = (elem, size = 100) => {
  const context = elem.getContext('2d');
  context.clearRect(0, 0, 500, 500);
  context.fillStyle = '#C9ADA7';
  context.globalAlpha = 0.75;
  context.fillRect(0, 0, 500, 500);
}

/**
 *
 * @param {string} rectangleId
 * @param {string} textId
 */
export const makeRectangle = (rectangleElem, textId) => {
  if (window.innerWidth < 1024) {
    drawRectangle(rectangleElem, 200);
  } else {
    drawRectangle(rectangleElem);
  }

  rectangleElem.addEventListener('mouseenter', () => {
    document.getElementById(textId).style.color = PANEL_FONT_COLOR_HOVER;
  });
  rectangleElem.addEventListener('mouseleave', () => {
    document.getElementById(textId).style.color = PANEL_FONT_COLOR;
  });

  document.getElementById(textId).style.color = PANEL_FONT_COLOR;
}
