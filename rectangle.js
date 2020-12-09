const PANEL_FONT_COLOR = "#4A4E69";
const PANEL_FONT_COLOR_HOVER = "#F2E9E4";

export const drawRectangle = (elem, size = 100) => {
	// Make an instance of two and place it on the page.
  const params = { width: size, height: size };
  const two = new Two(params).appendTo(elem);

  // two has convenience methods to create shapes.
  const rect = two.makeRectangle(size/2, size/2, size, size);

  rect.fill = '#C9ADA7';
  rect.opacity = 0.75;
  rect.noStroke();

  // Don't forget to tell two to render everything
  // to the screen
  two.update();
}

/**
 *
 * @param {string} rectangleId
 * @param {string} textId
 */
export const makeRectangle = (rectangleElem, textId) => {
  drawRectangle(rectangleElem);

  rectangleElem.addEventListener('mouseenter', () => {
    document.getElementById(textId).style.color = PANEL_FONT_COLOR_HOVER;
  });
  rectangleElem.addEventListener('mouseleave', () => {
    document.getElementById(textId).style.color = PANEL_FONT_COLOR;
  });

  document.getElementById(textId).style.color = PANEL_FONT_COLOR;
}
