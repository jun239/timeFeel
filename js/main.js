'use strict';

{

  /* 変数定義 */
  const count = document.getElementById('count');
  const stop = document.getElementById('stopBtn');
  const reset = document.getElementById('rtnBtn');
  const rsltMsg = document.getElementById('rsltMsg');
  const secBtn = document.getElementsByClassName('secBtn');

  let startTime;
  let timeoutId;
  let elapsedTime = 0;
  let minutes;
  let sec;
  let msec;
  let countSec;
  let zeroFlg;

  for (let i = 0; i < secBtn.length; i++) {
    secBtn[i].addEventListener("click", () => {
      if (secBtn[i].getAttribute('id') == '10') {
        countSec = 10000;
      } else if (secBtn[i].getAttribute('id') == '30') {
        countSec = 30000;
      } else {
        countSec = 59999;
      }

      document.getElementById('page1').classList.add("displayNone");
      document.getElementById('page2').classList.remove("displayNone");

      startTime = Date.now();
      startCountDown();
    }, false);
  }

  // スタート用カウントダウン関数
  function startCountDown() {
    zeroFlg = true;
    const d = new Date(startTime - Date.now() + 3999);
    const s = String(d.getSeconds()).padStart(1, '0');
    count.textContent = `${s}`;

    timeoutId = setTimeout(() => {
      if (count.textContent == '0') {
        stop.classList.remove('inactive');
        count.classList.remove('count');
        count.classList.add('counter');
        startTime = Date.now();
        countDown();
      } else {
        startCountDown();
      }
    }, 10);
  }

  // カウントダウン用関数
  function countDown() {
    if (zeroFlg == true) {
      const d = new Date(startTime - Date.now() + countSec);
      const m = String(d.getMinutes()).padStart(2, '0');
      const s = String(d.getSeconds()).padStart(2, '0');
      const ms = String(d.getMilliseconds()).padStart(3, '0');
      count.textContent = `${s}.${ms}`;
  
      minutes = `${m}`;
      sec = `${s}`;
      msec = `${ms}`;
  
      // 時間を隠す
      if (Date.now() - startTime >= 4000) {
        document.getElementById('count').classList.add("displayNone");
        document.getElementById('question').classList.remove("displayNone");
      }

      if (sec == '00' && parseInt(msec) <= parseInt('010')) {
        startTime = Date.now();
        zeroFlg = false;
      }
    } else {
      // カウントアップさせる
      const d = new Date(Date.now() - startTime);
      const m = String(d.getMinutes()).padStart(2, '0');
      const s = String(d.getSeconds()).padStart(2, '0');
      const ms = String(d.getMilliseconds()).padStart(3, '0');
      count.textContent = `-${s}.${ms}`;

      minutes = `${m}`;
      sec = `${s}`;
      msec = `${ms}`;
    }
    
    timeoutId = setTimeout(() => {
      countDown();
    }, 10);
  }

  // ストップ時処理
  stop.addEventListener('click', () => {
    if (stop.classList.contains('inactive') === true) {
      return;
    }
    // setButtonStateStopped();
    clearTimeout(timeoutId);
    // elapsedTime += Date.now() - startTime;

    document.getElementById('rsltSec').textContent = count.textContent;
    document.getElementById('question').classList.add("displayNone");

    // ストップした時の残り時間が0±1であるかどうかの判定
    if (sec == '00' && msec == '000') {
      rsltMsg.textContent = '神ですか？';
    } else if (sec == '00' || sec == '01' && msec == '000') {
      rsltMsg.textContent = 'あなたは時感王！';
    } else {
      rsltMsg.textContent = 'もっと時感を鍛えろ！';
    }

    // pege切り替え
    document.getElementById('page2').classList.add("displayNone");
    document.getElementById('page3').classList.remove("displayNone");
    document.getElementById('count').classList.remove("displayNone");
  });

  // リセット時処理
  reset.addEventListener('click', () => {
    // pege切り替え
    document.getElementById('page3').classList.add("displayNone");
    document.getElementById('page1').classList.remove("displayNone");
    document.getElementById('count').classList.remove("displayNone");

    stop.classList.add('inactive');
  });
}