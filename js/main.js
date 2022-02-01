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

//badge 스크롤하면 특정 위치부터는 badge 사라지게
// 사용한 자바스크립트 플러그인 : lodash cdn / gsap cdn
const badgeEl = document.querySelector('header .badges');
const toTopEl = document.querySelector('#to-top');

window.addEventListener('scroll', _.throttle(function(){
  console.log(window.scrollY);
  if (window.scrollY > 500) {
    //배지 숨기기
    // gsap.to(요소, 지속기간, 옵션);
    gsap.to(badgeEl, .6, {
      opacity:0,
      display:'none'
    });
    //to-top 버튼 보이기!
    //toTopEl대신 '#to-top'에 직접 명령도 가능함
    gsap.to(toTopEl, .2, {
      x: 0 //x축 오른쪽으로 100만큼 이동
    });
  } else {
    // 배지 보이기
    gsap.to(badgeEl, .6, {
      opacity:1,
      display:'block'
    });
    //to-top 버튼 숨기기!
    gsap.to(toTopEl, .2, {
      x: 100 //x축 오른쪽으로 100만큼 이동
    });
  }
},300));


toTopEl.addEventListener('click',function () {
  gsap.to(window, .7, {
    scrollTo:0 //화면의 위치를 0 지점으로 옮긴다
  });
});

// _.throttle(함수, 시간);
// gsap.to(요소, 지속기간, 옵션); 
// opacity:0 -> opacity:1로 애니메이션을 사용하면 눈에 보이는 영역은 사라지는 것 처럼 보이지만, 실제로 요소는 영역에 있음
// 이 문제를 해결하기 위해서는 display:'none' 


//처음 페이지 로딩 시(새로고침) visual 영역 순차적으로 실행되도록
const fadeEls = document.querySelectorAll('.visual .fade-in');
fadeEls.forEach(function (fadeEl, index){
  // gsap.to(요소, 지속기간, 옵션);
  gsap.to(fadeEl, 1, {
    //순차적으로 delay효과 주기 위해 index(fadeEls 요소들의 각 순번)+1 에 각각 .7초 차이로 나타나도록 반복 실행(자동화)
    delay: (index + 1) * .7,
    opacity: 1
  });
}); 

// 공지사항 Swiper
// new Swiper(선택자, 옵션)
new Swiper('.notice-line .swiper', {
  direction: 'vertical',
  autoplay: true, //자동 슬라이드 재생
  loop: true // 반복 재생 실행
});

// promotion swiper
new Swiper('.promotion .swiper', {
  slidesPerView:3, //한번에 보여줄 슬라이드 개수
  spaceBetween: 10, //슬라이드 사이 여백
  centeredSlides: true, // 1번 슬라이드가 가운데 보이기
  loop: true,
  // autoplay: {
  //   delay: 5000
  // },
  pagination: {
    el:'.promotion .swiper-pagination', //페이지 번호 요소 선택자
    clickable: true //사용자의 페이지 번호 요소 제거 가능 여부
  },
  navigation: {
    prevEl: '.promotion .swiper-button-prev',
    nextEl: '.promotion .swiper-button-next'
  }
});

// 하단 awards swiper
new Swiper('.awards .swiper-container', {
  autoplay: true,
  loop: true,
  spaceBetween: 30,
  slidesPerView: 5,
  navigation: {
    prevEl:'.awards .swiper-prev',
    nextEl:'.awards .swiper-next'
  }
});

//promotion을 선택하면 toggle-promotion 열리고 닫힘
const promotionEl = document.querySelector('.promotion'); 
const promotionToggleBtn = document.querySelector('.toggle-promotion');

let isHidePromotion = false; //숨겨지지 않음 -> 현재 보여진다
promotionToggleBtn.addEventListener('click', function () {
  //변수 앞에 !가 있으면 그 반대에 해당하는 값을 반환한다
  isHidePromotion = !isHidePromotion 
  // if 조건문에 (true)
  if (isHidePromotion) {
    //숨김 처리
    promotionEl.classList.add('hide');
  } else { 
    //보임 처리
    promotionEl.classList.remove('hide');
  }
});


// 범위 랜덤 함수(소수점 2자리까지) 랜덤한 숫자를 생성하는 함수
function random(min, max) {
  // `.toFixed()`를 통해 반환된 문자 데이터를,
  // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}

//floating 움직이는 동작
function floatingObject(selector, delay, size) {
  // gsap.to(요소, 시간, 옵션);
  gsap.to(selector, //선택자
    random(1.5, 2.5), //애니메이션 동작 시간
    { //옵션
      y:size, //y축 이동
      repeat: -1, //반복 재생 무한
      yoyo: true, //애니메이션 효과가 다시 돌아오도록
      ease: Power1.easeInOut, //애니메이션 효과 gsap easing
      delay: random(0, delay)
  });
}
floatingObject('.floating1', 1, 15);
floatingObject('.floating2', .5, 15);
floatingObject('.floating3', 1.5, 20);

const spyEls = document.querySelectorAll('section.scroll-spy');

spyEls.forEach(function (spyEl) {
  new ScrollMagic
    .Scene({
      triggerElement: spyEl, 
      //보여짐 여부를 감시하는 요소 spyEl
      triggerHook: .8 
      // 뷰포트 지점 0.8에 위치하면
    })
    .setClassToggle(spyEl, 'show')
    .addTo(new ScrollMagic.Controller());
});

//footer 부분 자동으로 올해 계산하여 작성되도록
const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear(); //this-year클래스의 요소에 2022이 반환됨