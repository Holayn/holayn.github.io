function addPrevClass (e) {
  const target = e.target;
  const dock = target.parentNode;
  const prevDockItem = dock.previousElementSibling;
  if (prevDockItem) {
    prevDockItem.className = 'prev';
  }

  // target.addEventListener('mouseout', function() {
  //   prevDockItem.removeAttribute('class');
  // }, false);
}

const elems = document.getElementsByClassName('dock-item');
for (let i=0; i<elems.length; i++) {
  elems.item(i).addEventListener('mouseover', addPrevClass, false);
}