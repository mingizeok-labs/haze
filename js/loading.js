const params = new URLSearchParams(location.search);
const siteKey = params.get("site");
const site = window.SERVICES[siteKey];

if (!site) {
  const text = document.querySelector(".loading-text");
  
  // 사용자에게 상태를 알림
  text.textContent = "실험실 정보를 찾을 수 없습니다. 메인으로 돌아갑니다. 잠시만 기다려주세요. 밍기적... 밍기적...";
  
  // 1.5초 뒤에 index.html로 이동
  setTimeout(() => {
    window.location.replace("index.html");
  }, 1700);

  throw new Error("Invalid site key");
}

// 외부 사이트면 바로 이동
if (site.type === "external") {
  location.href = site.url;
}

// Render 서버면 로딩 연출
if (site.type === "render") {
  const text = document.querySelector(".loading-text");
  text.textContent = "밍기적... 밍기적... 실험실로 이동 중.";

  const checkServer = async () => {
    try {
      await fetch(site.url, { 
        mode: 'no-cors',
        cache: 'no-store' // 매번 새로 확인하도록 설정
      });

      // 서버가 응답을 하면 (깨어났으면) 바로 이동
      console.log("실험실 도착 완료! +ㅅ+ ");
      location.replace(site.url);
    } catch (error) {
      // 서버가 아직 잠들어있으면 2초 후에 다시 실행
      console.log("실험실 경로 재검색.. 밍기적... 밍기적... 밍기적...");
      setTimeout(checkServer, 2000);
    }
  };

  checkServer(); // 함수 실행
}
