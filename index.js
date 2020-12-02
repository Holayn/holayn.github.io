const PANEL_FONT_COLOR = "#4A4E69";

const swup = new Swup(); // only this line when included with script tag

const makeRectangle = (id) => {
	// Make an instance of two and place it on the page.
  const elem = document.getElementById(id);
  const params = { width: 100, height: 100 };
  const two = new Two(params).appendTo(elem);

  // two has convenience methods to create shapes.
  const rect = two.makeRectangle(50, 50, 100, 100);

  rect.fill = '#C9ADA7';
  rect.opacity = 0.75;
  rect.noStroke();

  // Don't forget to tell two to render everything
  // to the screen
  two.update();
}

init();

function init() {
  makeRectangle('left-rectangle');
  makeRectangle('top-rectangle');
  makeRectangle('right-rectangle');

  document.getElementById('top-text').style.color = PANEL_FONT_COLOR;
  document.getElementById('left-text').style.color = PANEL_FONT_COLOR;
  document.getElementById('right-text').style.color = PANEL_FONT_COLOR;

  document.getElementById('top-rectangle').addEventListener('mouseenter', () => {
    document.getElementById('top-text').style.color = "#F2E9E4";
  });
  document.getElementById('top-rectangle').addEventListener('mouseleave', () => {
    document.getElementById('top-text').style.color = PANEL_FONT_COLOR;
  });

  document.getElementById('left-rectangle').addEventListener('mouseenter', () => {
    document.getElementById('left-text').style.color = "#F2E9E4";
  });
  document.getElementById('left-rectangle').addEventListener('mouseleave', () => {
    document.getElementById('left-text').style.color = PANEL_FONT_COLOR;
  });

  document.getElementById('right-rectangle').addEventListener('mouseenter', () => {
    document.getElementById('right-text').style.color = "#F2E9E4";
  });
  document.getElementById('right-rectangle').addEventListener('mouseleave', () => {
    document.getElementById('right-text').style.color = PANEL_FONT_COLOR;
  });
}