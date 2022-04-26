const $ = (selector) => document.querySelector(selector);
const $all = (selector) => document.querySelectorAll(selector);
function App() {
    //메뉴 수정 ( 메뉴의 수정 버튼 클릭 이벤트를 받고, 메뉴 수정하는 모달창을 띄운다. 모달창에서 신규메뉴명을 입력받고 확인을 누르면 수정된다.) - 이벤트 위임
    $("#espresso-menu-list").addEventListener("click", (e) => {
        if (e.target.classList.contains("menu-edit-button")) {
            const changeMenu = prompt("메뉴를 수정해주세요", `${e.target.closest("li").querySelector(".menu-name").innerText}`);
            if (changeMenu !== "" && changeMenu !== null) {
                $(".menu-name").innerText = changeMenu;
            } else if (changeMenu === "") {
                return alert("빈 값을 입력하셨습니다.");
            } else if (changeMenu === null) {
                return;
            }
        }
    });

    //메뉴 삭제 (이벤트 위임)
    $("#espresso-menu-list").addEventListener("click", (e) => {
        if (e.target.classList.contains("menu-remove-button") && confirm("삭제하시겠습니까?")) {
            $(".py-2").outerHTML = "";
            const menuCount = $all("#espresso-menu-list > li").length;
            $(".menu-count").innerText = `총 ${menuCount}개`;
        }
    });

    // e.preventDefault 넣은 함수
    $("#espresso-menu-form").addEventListener("submit", (e) => {
        e.preventDefault();
    });

    // 메뉴 생성
    const addMenuName = () => {
        if ($("#espresso-menu-name").value === "") {
            return alert("메뉴를 입력하세요");
        }
        const espressoMenuName = $("#espresso-menu-name").value;
        const menuItemTemplate = (espressoMenuName) => {
            return `
            <li class="menu-list-item d-flex items-center py-2">
            <span class="w-100 pl-2 menu-name">${espressoMenuName}</span>
            <button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button">
            수정
            </button>
            <button type="button" class="bg-gray-50 text-gray-500 text-sm menu-remove-button">
            삭제
            </button>
            </li>
            `;
        };
        $("#espresso-menu-list").insertAdjacentHTML("beforeend", menuItemTemplate(espressoMenuName));
        $("#espresso-menu-name").value = "";

        const menuCount = $all("#espresso-menu-list > li").length;
        $(".menu-count").innerText = `총 ${menuCount}개`;
    };

    //enter로 값 받기
    $("#espresso-menu-name").addEventListener("keypress", (e) => {
        if (e.key !== "Enter") {
            return;
        }

        if (e.key === "Enter") {
            addMenuName();
        }
    });

    //확인 버튼으로 값 받기
    $("#espresso-menu-submit-button").addEventListener("click", () => {
        addMenuName();
    });
}

App();
