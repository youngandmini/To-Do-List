
// id와 to_do_list는 전역변수로 가지고 있는 것이 좋아보임
let id;
const ul = document.getElementById("to_do_list");

// 기존에 있던 li를 to_do_list에 추가
window.onload = function(){

    if (localStorage.getItem("id") === null) {
        id = 0;
    } else {
        id = parseInt(localStorage.getItem("id"));
    }

    for (let i = 0; i <= id; i++) {
        if (localStorage.getItem(i.toString()) !== null) {

            // let checked = false;
            // const boolString = localStorage.getItem(i.toString() + "checked");
            // checked = boolString === 'true';

            addExistingWork(i, localStorage.getItem(i.toString()));
        }
    }

};

// 새로운 할일을 생성하라는 버튼
document.getElementById("add_list").addEventListener("click", addNewWork);
// 초기화 버튼
document.getElementById("clear_all").addEventListener("click", clearAll);


// 생성한 li를 to_do_list에 추가
function addLiToUl(li) {
    // const ul = document.getElementById("to_do_list");
    ul.appendChild(li);
}


// 새로운 할일 생성
function addNewWork(event) {
    const li = document.createElement("li");
    const work = "새로운 할 일";
    li.id = id;

    let checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    let checkSection = document.createElement("div");
    checkSection.classList.add("check-section");
    checkSection.appendChild(checkBox);

    let textSection = document.createElement("div");

    textSection.textContent = work;
    textSection.classList.add("text-section");

    let inputText = document.createElement("input");
    inputText.setAttribute("type", "text");
    inputText.classList.add("text-input-section");
    inputText.style.display = "none";

    let editCompleteButton = document.createElement("button");
    editCompleteButton.classList.add("edit-complete-button");
    editCompleteButton.textContent = "완료";
    editCompleteButton.style.display = "none";

    let editButton = document.createElement("button");
    editButton.classList.add("edit-button");
    editButton.textContent = "수정";

    let removeButton = document.createElement("button");
    removeButton.classList.add("remove-button");
    removeButton.textContent = "삭제";

    let buttonSection = document.createElement("div");
    buttonSection.classList.add("button-section");
    buttonSection.appendChild(editCompleteButton);
    buttonSection.appendChild(editButton);
    buttonSection.appendChild(removeButton);

    li.appendChild(checkSection);
    li.appendChild(textSection);
    li.appendChild(inputText);
    li.appendChild(buttonSection);

    addLiToUl(li);

    editButton.addEventListener("click", editForm);
    editCompleteButton.addEventListener("click", edit);
    removeButton.addEventListener("click", remove);
    checkBox.addEventListener("change", checked);

    //새로 만든 것은 로컬스토리지에 등록해줘야함.
    localStorage.setItem(id.toString(), work);
    id += 1;
    localStorage.setItem("id", id.toString());
}


// 기존의 할일 불러오기
function addExistingWork(existingId, work) {
    const li = document.createElement("li");
    li.id = existingId;

    let checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");

    // if (checked) {
    //     checkBox.checked = true;
    // }

    let checkSection = document.createElement("div");
    checkSection.classList.add("check-section");
    checkSection.appendChild(checkBox);

    let textSection = document.createElement("div");

    textSection.textContent = work;
    textSection.classList.add("text-section");

    // if (checked) {
    //     textSection.style.textDecorationLine = "line-through";
    // }

    let inputText = document.createElement("input");
    inputText.setAttribute("type", "text");
    inputText.classList.add("text-input-section");
    inputText.style.display = "none";

    let editCompleteButton = document.createElement("button");
    editCompleteButton.classList.add("edit-complete-button");
    editCompleteButton.textContent = "완료";
    editCompleteButton.style.display = "none";

    let editButton = document.createElement("button");
    editButton.classList.add("edit-button");
    editButton.textContent = "수정";

    let removeButton = document.createElement("button");
    removeButton.classList.add("remove-button");
    removeButton.textContent = "삭제";

    let buttonSection = document.createElement("div");
    buttonSection.classList.add("button-section");
    buttonSection.appendChild(editCompleteButton);
    buttonSection.appendChild(editButton);
    buttonSection.appendChild(removeButton);

    li.appendChild(checkSection);
    li.appendChild(textSection);
    li.appendChild(inputText);
    li.appendChild(buttonSection);

    addLiToUl(li);

    editButton.addEventListener("click", editForm);
    editCompleteButton.addEventListener("click", edit);
    removeButton.addEventListener("click", remove);
    checkBox.addEventListener("change", checked);

}

//========================================================

//수정버튼을 누르면
function editForm(event) {
    const target = event.target;
    const li = target.parentElement.parentElement;
    let existingValue;

    li.querySelectorAll(".text-section").forEach((text) => {
        existingValue = text.textContent;
        text.style.display = "none";
    });

    li.querySelectorAll(".text-input-section").forEach((text_input) => {
        text_input.style.display = "";
        text_input.value = existingValue;
    });

    li.querySelectorAll(".edit-complete-button").forEach((edit_complete_button) => {
        edit_complete_button.style.display = "";
    });

    li.querySelectorAll(".edit-button").forEach((edit_button) => {
        edit_button.style.display = "none";
    });
}

//수정완료버튼을 누르면
function edit(event) {
    const target = event.target;
    const li = target.parentElement.parentElement;
    const parentId = li.id;
    let editedValue;

    li.querySelectorAll(".text-input-section").forEach((text_input) => {
        text_input.style.display = "";
        editedValue = text_input.value;
        text_input.style.display = "none";
    });

    li.querySelectorAll(".text-section").forEach((text) => {
        text.textContent = editedValue;
        text.style.display = "";
        localStorage.setItem(parentId.toString(), editedValue);
    });

    li.querySelectorAll(".edit-complete-button").forEach((edit_complete_button) => {
        edit_complete_button.style.display = "none";
    });

    li.querySelectorAll(".edit-button").forEach((edit_button) => {
        edit_button.style.display = "";
    });
}

//삭제버튼을 누르면
function remove(event){
    const target = event.target;
    const li = target.parentElement.parentElement;
    const liId = li.id;

    let yes_or_no = confirm("정말 삭제하시겠습니까? 내용은 복구되지 않습니다.");
    if (yes_or_no) {
        li.parentElement.removeChild(li);
        localStorage.removeItem(liId.toString());
    }
}

//체크박스를 체크/해제하면
function checked(event) {
    let target = event.target;
    let li = target.parentElement.parentElement;
    const liId = li.id;

    li.querySelectorAll(".text-section").forEach((text) => {

        if (this.checked) {
            text.style.textDecorationLine = "line-through";
            // localStorage.setItem(liId.toString() + "checked", true.toString());
        } else {
            text.style.textDecorationLine = "none";
            // localStorage.removeItem(liId.toString() + "checked");
        }
    });
}


//==========================================================================

//초기화
function clearAll() {

    let yes_or_no = confirm("정말 초기화하시겠습니까? 내용은 복구되지 않습니다.");
    if (yes_or_no) {
        //삭제
        ul.innerHTML = "";
        localStorage.clear();
    }

}