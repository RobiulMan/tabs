(function () {
  const btnItem = document.querySelectorAll(".btn__item");
  const tabItem = document.querySelectorAll(".tab__body__item");
  btnItem.forEach((item, index) => {
    /**
     * mouse movement event
     */
    item.addEventListener(
      "mouseover",
      (e) => {
        if (e.currentTarget.id !== "select") {
          e.currentTarget.className = "btn__item mousehover";
        } else {
          e.currentTarget.className = "btn__item";
        }
      },
      false
    );

    item.addEventListener(
      "mouseout",
      (e) => {
        if (item.classList[1] === "mousehover") {
          e.currentTarget.className = "btn__item";
        }
      },
      false
    );

    /**
     * click event
     */
    item.addEventListener(
      "click",
      (e) => {
        const gradientColor = linearTagMaker();
        let svgPaths = [...item.children[0].children];
        let svg = item.children[0];

        //svg path set attribute
        if (e.currentTarget.id !== "select") {
          svgPaths.forEach((path) => {
            if (path.tagName === "path") {
              path.setAttribute("fill", "url(#gradient)");
            }
          });

          // it makes active contetn or button
          svg.appendChild(gradientColor);
          e.currentTarget.setAttribute("id", "select");

          tabItem[index].setAttribute("id", "active");
        }

        // it makes remove actived conent or button
        btnItem.forEach((activeItem, index) => {
          let linearGradientTag = activeItem.firstElementChild.lastElementChild;

          if (
            e.currentTarget !== activeItem &&
            linearGradientTag.tagName === "linearGradient"
          ) {
            let [...path] = activeItem.firstElementChild.children;
            //remove path fill attrabute
            path.forEach((pathItem) => {
              if (pathItem.tagName === "path") {
                pathItem.removeAttribute("fill", "url(#gradient)");
              }
            });

            activeItem.removeAttribute("id", "select");
            linearGradientTag.remove();

            //tab body conent actived remove
            tabItem[index].removeAttribute("id", "active");
          }
        });
      },
      false
    );
  });

  //linearGradientTag maker funciton
  function linearTagMaker() {
    const link = "http://www.w3.org/2000/svg";
    const linerTag = document.createElementNS(link, "linearGradient");
    linerTag.setAttribute("id", "gradient");
    linerTag.setAttribute("gradientTransform", "rotate(87)");

    //stoptag maker functon
    function stopTag(tag, ...att) {
      const stopTag = document.createElementNS(link, tag);
      stopTag.setAttribute(att[0], att[1]);
      stopTag.setAttribute(att[2], att[3]);
      return stopTag;
    }

    let stopFirst = stopTag("stop", "offset", "38%", "stop-color", "#ff328c");
    let stopSecond = stopTag("stop", "offset", "94%", "stop-color", "#ff2558");

    linerTag.appendChild(stopFirst);
    linerTag.appendChild(stopSecond);

    return linerTag;
  }
})();
