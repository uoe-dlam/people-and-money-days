updatePageToDisplayDays();

function updatePageToDisplayDays() {
  updateAbsenceBalance();
  updateExistingAbsences();
}

function updateAbsenceBalance() {
  // get all spans that could contain the hours balance data
  const tdSpans = document.querySelectorAll("td span.xna");

  // loop the matching elements
  for (let i = 0; i < tdSpans.length; i++) {
    // check if the next element match contains the word "Hours"
    if (tdSpans[i + 1].textContent.trim() === "Hours") {
      // convert hours to days
      tdSpans[i].innerHTML = convertToDays(tdSpans[i].textContent);

      // convert the word "Hours" to "Days"
      tdSpans[i + 1].innerHTML = "&nbsp;Days";
    }
  }
}

function updateExistingAbsences() {
  const absencesSpans = document.querySelectorAll("span.x2r9");

  const re = /Leave: (\d+) (Hours)/g;

  // loop the matching elements
  for (let i = 0; i < absencesSpans.length; i++) {
    // need to do a regular expression to match elements
    const matchArray = [...absencesSpans[i].textContent.matchAll(re)];

    if (matchArray.length < 1) {
      continue;
    }

    // Convert the hours to days
    const days = convertToDays(matchArray[0][1]);

    absencesSpans[i].textContent = `Leave: ${days} ${
      days === 1 ? "Day" : "Days"
    }`;
  }
}

function convertToDays(hours) {
  return +Number.parseFloat(hours / 7).toFixed(2);
}
