//画像と動画の設定
var windowwidth =
  window.innerWidth || document.documentElement.clientWidth || 0;
if (windowwidth > 768) {
  var responsiveImage = [{ src: "./img/pastel_00041.jpg" }];
} else {
  var responsiveImage = [
    //タブレットサイズ（768px）以下用の画像
    { src: "./img/pastel_00041.jpg" },
  ];
}

//Vegas全体の設定
$("#slider").vegas({
  overlay: true, //画像の上に網線やドットのオーバーレイパターン画像を指定。
  transition: "fade2", //切り替わりのアニメーション。http://vegas.jaysalvat.com/documentation/transitions/参照。fade、fade2、slideLeft、slideLeft2、slideRight、slideRight2、slideUp、slideUp2、slideDown、slideDown2、zoomIn、zoomIn2、zoomOut、zoomOut2、swirlLeft、swirlLeft2、swirlRight、swirlRight2、burnburn2、blurblur2、flash、flash2が設定可能。
  transitionDuration: 5000, //切り替わりのアニメーション時間をミリ秒単位で設定
  delay: 5000, //スライド間の遅延をミリ秒単位で。
  animationDuration: 30000, //スライドアニメーション時間をミリ秒単位で設定
  animation: "random", //スライドアニメーションの種類。http://vegas.jaysalvat.com/documentation/transitions/参照。kenburns、kenburnsUp、kenburnsDown、kenburnsRight、kenburnsLeft、kenburnsUpLeft、kenburnsUpRight、kenburnsDownLeft、kenburnsDownRight、randomが設定可能。
  slides: responsiveImage, //画像と動画の設定を読む
});

/*===========================================================*/
/*クリックしたらナビが右から左に出現*/
/*===========================================================*/

$(".openbtn").click(function () {
  //ボタンがクリックされたら
  $(this).toggleClass("active"); //ボタン自身に activeクラスを付与し
  $("#g-nav").toggleClass("panelactive"); //ナビゲーションにpanelactiveクラスを付与
  const overlay = document.getElementById("js_overlay");
});

$(".overlay").click(function () {
  //ボタンがクリックされたら
  $(".openbtn").toggleClass("active"); //ボタン自身に activeクラスを付与し
  $("#g-nav").toggleClass("panelactive"); //ナビゲーションにpanelactiveクラスを付与
});

$("#g-nav a").click(function () {
  //ナビゲーションのリンクがクリックされたら
  $(".openbtn").removeClass("active"); //ボタンの activeクラスを除去し
  $("#g-nav").removeClass("panelactive"); //ナビゲーションのpanelactiveクラスも除去
});

/*===========================================================*/
/* ハンバーガーとSNSアイコンが重なったら避ける*/
/*===========================================================*/
const child = document.querySelector("#sns-icon");
const cb = function (entries) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      // 重なった時
      entry.target.classList.add("inview");
    } else {
      // 通過した時
      entry.target.classList.remove("inview");
    }
  });
};

const options = {
  root: null,
  rootMargin: "-120px 0px 0px 0px",
  threshid: 0,
};

const io = new IntersectionObserver(cb, options);
for (let i = 0; i < child.childElementCount; i++) {
  io.observe(child.children[i]);
}

/*===========================================================*/
/* カテゴリ別に画像を並び替える*/
/*===========================================================*/
//＝＝＝ Fancyboxの設定
$("[data-fancybox]").fancybox({
  thumbs: {
    autoStart: false, //グループのサムネイル一覧をデフォルトで出す。不必要であればfalseに
  },
});

/*===========================================================*/
/* 順番に現れる（CSS x jQuery）*/
/*===========================================================*/

function delayScrollAnime() {
  var time = 0.2; //遅延時間を増やす秒数の値
  var value = time;
  $(".delayScroll").each(function () {
    var parent = this; //親要素を取得
    var elemPos = $(this).offset().top; //要素の位置まで来たら
    var scroll = $(window).scrollTop(); //スクロール値を取得
    var windowHeight = $(window).height(); //画面の高さを取得
    var childs = $(this).children(); //子要素

    if (scroll >= elemPos - windowHeight && !$(parent).hasClass("play")) {
      //指定領域内にスクロールが入ったらまた親要素にクラスplayがなければ
      $(childs).each(function () {
        if (!$(this).hasClass("fadeUp")) {
          //アニメーションのクラス名が指定されているかどうかをチェック

          $(parent).addClass("play"); //親要素にクラス名playを追加
          $(this).css("animation-delay", value + "s"); //アニメーション遅延のCSS animation-delayを追加し
          $(this).addClass("fadeUp"); //アニメーションのクラス名を追加
          value = value + time; //delay時間を増加させる

          //全ての処理を終わったらplayを外す
          var index = $(childs).index(this);
          if (childs.length - 1 == index) {
            $(parent).removeClass("play");
          }
        }
      });
    } else {
      $(childs).removeClass("fadeUp"); //アニメーションのクラス名を削除
      value = time; //delay初期値の数値に戻す
    }
  });
}

//========================================================
// 関数をまとめる
//========================================================

// ページが読み込まれたらすぐに動かしたい場合の記述
$(window).on("load", function () {
  /*===========================================================*/
  /*機能編  6-2-2 カテゴリ別に画像を並び替える*/
  /*===========================================================*/
  //画面遷移時にギャラリーの画像が被らないように、すべての読み込みが終わった後に実行する
  //＝＝＝Muuriギャラリープラグイン設定
  var grid = new Muuri(".grid", {
    //アイテムの表示速度※オプション。入れなくても動作します
    showDuration: 600,
    showEasing: "cubic-bezier(0.215, 0.61, 0.355, 1)",
    hideDuration: 600,
    hideEasing: "cubic-bezier(0.215, 0.61, 0.355, 1)",

    // アイテムの表示/非表示状態のスタイル※オプション。入れなくても動作します
    visibleStyles: {
      opacity: "1",
      transform: "scale(1)",
    },
    hiddenStyles: {
      opacity: "0",
      transform: "scale(0.5)",
    },
  });

  //＝＝＝並び替えボタン設定
  $(".sort-btn li").on("click", function () {
    //並び替えボタンをクリックしたら
    $(".sort-btn .active").removeClass("active"); //並び替えボタンに付与されているactiveクラスを全て取り除き
    var className = $(this).attr("class"); //クラス名を取得
    className = className.split(" "); //「sortXX active」のクラス名を分割して配列にする
    $("." + className[0]).addClass("active"); //並び替えボタンに付与されているクラス名とギャラリー内のリストのクラス名が同じボタンにactiveクラスを付与
    if (className[0] == "sort00") {
      //クラス名がsort00（全て）のボタンの場合は、
      grid.show(""); //全ての要素を出す
      setTimeout(function () {
        //ここからは選択後にふわっと出すアニメーションを使用したい場合の追記
        delayScrollAnime();
      }, 1000); //ここまで
    } else {
      //それ以外の場合は
      grid.filter("." + className[0]); //フィルターを実行
      setTimeout(function () {
        //ここからは選択後にふわっと出すアニメーションを使用したい場合の追記
        delayScrollAnime();
      }, 1000); //ここまで
    }
  });

  /*===========================================================*/
  /* テキストがバラバラに出現 */
  /*===========================================================*/

  //spanタグを追加する
  var element = $(".TextRandomAnime");
  element.each(function () {
    var text = $(this).text();
    var textbox = "";
    text.split("").forEach(function (t) {
      textbox += "<span>" + t + "</span>";
    });
    $(this).html(textbox);
  });
}); //ここまでページが読み込まれたらすぐに動かしたい場合の記述

$(window).scroll(function () {
  delayScrollAnime(); // 順番に現れる
});
