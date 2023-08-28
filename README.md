# ToDo 리스트를 HTML / CSS / JS 를 이용하여 만들어보기

## [[결과물 보러가기↗]](https://youngandmini.github.io/To-Do-List/)

## Todo 앱 이미지
![image](https://github.com/youngandmini/To-Do-List/assets/80088671/cc8fb515-abb2-4f31-bc94-0ccb34912ba7)


## 사용한 방법들

### HTML / CSS
코드를 참고해주세요.

### 새로운 할 일 생성

헤더의 add_list 버튼에 addEventListener를 추가하고, 새로운 리스트를 생성하는 함수를 script.js에 추가하였다.

하나의 할 일에 포함되어야 할 요소들은 아래와 같다.

* 체크박스
* 텍스트
* 수정/완료 버튼
* 삭제 버튼

위 요소들은 새로운 리스트를 생성될 때, 함께 생성되어야하는 요소들이다.

리스트를 만들고, 해당 리스트에 체크박스/텍스트/수정버튼/완료버튼/삭제버튼을 child로 추가해주었다.
이때 각각의 버튼에 대한 EventListener도 추가되도록 하였다.


### localStorage를 활용하여 브라우저에 Todo 리스트 저장

중요한 기능인 저장기능을 구현하기 위하여 localStorage를 채택하였다.

우선, localStorage에 현재 id를 저장하여 다음 저장할 리스트의 id를 갖고 있도록 하였다. 새로운 리스트를 생성할 때, 현재 id 값을 리스트의 id 값으로 설정하여 리스트들을 구분하였다.

할일 리스트를 저장할 때 필요한 정보는 텍스트와 체크 여부이다. 각각을 리스트 id를 이용해 localStorage에 저장/조회할 수 있도록 하였다.

한편, 처음 페이지 로드 시에는 localStorage에 저장된 현재 id 값 이하의 모든 id를 조회하는 방식으로 삭제되지 않은 모든 리스트를 불러오도록 하였다.

