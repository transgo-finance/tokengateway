import Vue from "vue";
import VueI18n from "vue-i18n";
import cn from "./lang/zh.js";
import en from "./lang/en.js";

import iviewen from "view-design/dist/locale/en-US";
import iviewzh from "view-design/dist/locale/zh-CN";

import jscookie from "js-cookie";

import swapen from "./lang/swap.en.js";
import swapzh from "./lang/swap.zh.js";

import poolen from "./lang/pool.en.js";
import poolzh from "./lang/pool.zh.js";


Vue.use(VueI18n);
const langList = ["en", "zh"];

const initKey = initLangKey();

// 使view-design多语言生效
Vue.locale = () => {};

const i18n = new VueI18n({
  locale: initKey,
  messages: {
    en: Object.assign({}, en, iviewen,swapen,poolen),
    zh: Object.assign({}, cn, iviewzh,swapzh,poolzh),
  },
});

// 初始化语言key
function initLangKey() {
  let langkey = jscookie.get("langkey");
  // 如果未初始化，通过浏览器判断应该设置成啥语言
  if (!langkey) {
    let lang = (navigator.language || navigator.browserLanguage)
      .toLowerCase()
      .substring(0, 2);
    switch (lang) {
      case "en":
        langkey = "en";
        break;
      case "zh":
        langkey = "zh";
        break;

      default:
        langkey = "en";
        break;
    }
  } else if (!langList.includes(langkey)) {
    // 如果不是en,zh,默认en
    langkey = "en";
  }
  jscookie.set("langkey", langkey, { expires: 180 });
  return langkey;
}

export default i18n;
