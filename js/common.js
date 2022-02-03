// class명이 search인 요소를 찾음
const searchEl = document.querySelector('.search');
//찾아 놓은 searchEl(.search)의 input 요소를 찾는다 
const searchInputEl = searchEl.querySelector('input');

//searchEl을 클릭했을 때 -> input요소에 focus하라는 명령
searchEl.addEventListener('click',function(){
  //logic..
  searchInputEl.focus();
});

//input에 focus 되었을 때
searchInputEl.addEventListener('focus', function() {
  //.search태그에 focused 클래스 추가
  searchEl.classList.add('focused');
  //input태그에 속성 추가('placeholder', '통합검색')
  searchInputEl.setAttribute('placeholder', '통합검색');
});

//input에 blur 되었을 때(focus 해제)
searchInputEl.addEventListener('blur', function() {
  //.search태그에 focused 클래스 추가
  searchEl.classList.remove('focused');
  //input태그에 속성 추가('placeholder', '통합검색')
  searchInputEl.setAttribute('placeholder', '');
});


//footer 부분 자동으로 올해 계산하여 작성되도록
const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear(); //this-year클래스의 요소에 2022이 반환됨