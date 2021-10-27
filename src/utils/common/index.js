export const elementPosition = (obj) => {
  var curleft = 0, curtop = 0;
  if (obj.offsetParent) {
      curleft = obj.offsetLeft;
      curtop = obj.offsetTop;
      while (obj = obj.offsetParent) {
          curleft += obj.offsetLeft;
          curtop += obj.offsetTop;
      }
  }
  return { x: curleft, y: curtop };
}

export const ScrollToControl = (elementId) => {
  var elem = document.getElementById(elementId);
  var scrollPos = elementPosition(elem).y; //部分页面存在固定的Head部分
  scrollPos = scrollPos - document.documentElement.scrollTop;
  var remainder = scrollPos % 50;
  var repeatTimes = (scrollPos - remainder) / 50;
  ScrollSmoothly(scrollPos, repeatTimes);
  window.scrollBy(0, remainder);
}