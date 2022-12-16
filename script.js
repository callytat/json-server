const Api = (() => {
  const apiUrl = "http://localhost:4232";
  const apiPath = "courseList";

  const getAvailableCourses = () =>
    fetch([apiUrl, apiPath].join("/")).then((response) => response.json());

  return {
    getAvailableCourses,
  };
})();

const View = (() => {
  const domstr = {
    coursecontainer: ".courseUnit",
  };
  // populate course list with data from API
  const createTmp = (arr) => {
    let tmp = "";
    // convert required to compulsory or elective
        arr.forEach((courseList) => {
      if (courseList.required === false) {
        courseList.courseNecessary = "Compulsory";
      } else {
        courseList.courseNecessary = "Elective";
      }

      tmp += `
      <li>
          <ul>${courseList.courseName}</ul>
          <ul>Course Type: ${courseList.courseNecessary}</ul>
        <ul>Course Credit: ${courseList.credit}</ul>
      </li>
      `;
    });

    return tmp;
  };

  const render = (ele, tmp) => {
    ele.innerHTML = tmp;
  };

  return {
    domstr,
    createTmp,
    render,
  };
})();

const Model = ((api, view) => {
  const { getAvailableCourses, addToSelectedCourses } = api;

  class Courses {
    constructor(courseName) {
      this.courseName = courseName;
      this.required = required;
      this.credit = credit;
    }
  }

  class State {
    #selected_courses = [];

    get selectedCourses() {
      return this.#selected_courses;
    }

    set selectedCourses(selectedCoursesList) {
      this.#selected_courses = selectedCoursesList;
      const courseUnit = document.querySelector(view.domstr.courseUnit);

      const tmp = view.createTmp(this.#selected_courses);

      view.render(courseUnit, tmp);
    }
  }

  return {
    getAvailableCourses,
    addToSelectedCourses,
    Courses,
    State,
  };
})(Api, View);

const controller = ((model, view) => {
  const state = new model.State();

  const init = () => {
    model.getAvailableCourses().then((courseList) => {
      state.selectedCourses = courseList;
    });
  };

  return { init };
})(Model, View);

controller.init();

//alternate color between white and green for class list
$(document).ready(function () {
  $("#ID-OF-DIV ul li:nth-child(odd)").addClass("alternate");
});

//add onClick event to turn color to 'deepskyblue'
//if click again, return color back to original
        function changeColorWhenSelected() {
            document.getElementById(
              "available_courses").style.backgroundColor =
                document.getElementById(
              "MyColorPicker").value;
        }


//assign credit value to each course to increase the counter (use Map?)
//if click again, return counter back to what it was previously
let numContainer = document.getElementById("num");
let value = 0;

let increaseUnits = document.querySelector(".inc");
let decreaseUnits = document.querySelector(".dec");
let resetUnits = document.querySelector(".reset");

increaseUnits.addEventListener("click", () => {
  value++;
  numContainer.textContent = value;
});

decreaseUnits.addEventListener("click", () => {
  value--;
  numContainer.textContent = value;
});

resetUnits.addEventListener("click", () => {
  value = 0;
  numContainer.textContent = value;
});

//add alert to user when unit maximum is exceeded
//add another alert when Select button is clicked with display of final # of units
//need if else statement
//prompts user to either select 'OK' and all courses will move over
//if select 'cancel', go back to previous screen
function alertUnits() {
  if (counter > 18)
    alert("You can only choose up to 18 credits in one semester");
} else if (counter < 12) {
    alert(`You have chosen ${counter} credits for this semester. You cannot change once you submit. Do you want to confirm?`);
}

