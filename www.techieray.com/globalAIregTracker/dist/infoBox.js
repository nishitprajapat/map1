function autoScroll(el) {
  const height = el.getBoundingClientRect().top;
  window.scrollTo(0, height);
}

function clearBox() {
  // const linkedinSlider = document.getElementById('linkedin-slider')
  const infoBox = document.getElementById("reg-info-box-content");
  const linkedinSliders = document.querySelectorAll(".linkedin-slider-wrapper");

  while (infoBox.firstChild) {
    infoBox.removeChild(infoBox.lastChild);
  }

  linkedinSliders.forEach((slider) => {
    slider.remove();
  });
  // while (linkedinSlider.firstChild) {
  //   linkedinSlider.removeChild(linkedinSlider.lastChild)
  // }
}

function displayInfo(countryCode) {
  // clearBox();
  const countryInfo = regSummary[countryCode];
  const infoBox = document.getElementById("reg-info-box-content");
  // const linkedinSlider = document.getElementById('linkedin-slider');

  const linkedinSlider = document.createElement("div");
  linkedinSlider.classList.add("linkedin-slider-wrapper");
  // infoBoxWrapper.appendChild(linkedinSlider)
  // <----------------------------------------------------------------------------------------->
  for (const [key, value] of Object.entries(countryInfo)) {
    const el = document.createElement(value["style"]);

    if (key == "TB") {
      for (let i = 0; i < value.text.length; i++) {
        let tableRow = document.createElement("tr");
        value.text[i].map((obj) => {
          let TableEle = document.createElement(`${obj.type}`);
          TableEle.innerText = obj.data;
          TableEle.classList.add("tableEle")
          tableRow.appendChild(TableEle);
        });
        tableRow.classList.add("tableRow")
        el.appendChild(tableRow);
      }
      el.classList.add("tables");
      infoBox.appendChild(el);
      console.log(el)
    }else if (typeof value.text == "object") {
      //Use '_' to denote a object with hyperlinks
         if (key.includes("_")) {
        value.text.forEach((v) => {
          const li = document.createElement("li");

          const sp = document.createElement("span");
          const anchor = document.createElement("a");
          const p = document.createTextNode(v["desc"]);

          anchor.target = "_blank";
          anchor.href = v["href"];
          anchor.innerText = v["label"];

          sp.appendChild(anchor);
          sp.appendChild(p);

          li.appendChild(sp);
          el.appendChild(li);
        });
      } else {
        value.text.forEach((v) => {
          const li = document.createElement("li");
          li.innerText = v;
          el.appendChild(li);
        });
      }
      infoBox.appendChild(el);
    } else if (key == "linkedin") {
      if (value.refs.length > 0) {
        value.refs.forEach((ln) => {
          const lcard = document.createElement("iframe");
          lcard.className = "lcard";
          lcard.src = ln;
          lcard.width = "90%";
          linkedinSlider.appendChild(lcard);
        });
      } else {
        const noLi = document.createElement("p");
        noLi.innerText = "No posts at this stage.";
        linkedinSlider.appendChild(noLi);
      }
      infoBox.appendChild(linkedinSlider);
    } else {
      const t = document.createTextNode(value.text);
      el.appendChild(t);
      infoBox.appendChild(el);
    }
  }
  // <----------------------------------------------------------------------------------------->
  autoScroll(infoBox);
  // <------------------------------------------------------------------------------------------------------------------------->
  // Get all list items within unordered lists
  var listItems = document.querySelectorAll("ul li");

  // Iterate over the list items
  for (var i = 0; i < listItems.length; i++) {
    var listItem = listItems[i];

    // Check if the list item contains the text "Regulations"
    if (
      listItem.textContent.includes("Regulations") ||
      listItem.textContent.includes("Taxpayer as Trader") ||
      listItem.textContent.includes("Taxpayer as Investor")
    ) {
      // Add a class or apply inline styles to the matching list item
      listItem.classList.add("headings");
    }
    // <------------------------------------------------------------------------------------------------------------------------->
  }
}

function displayRegInfoBox(countryCode, groupCode) {
  clearBox();
  if (groupCode != null) {
    displayInfo(groupCode);
  }
  if (countryCode in regSummary) {
    displayInfo(countryCode);
  }
}
