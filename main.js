(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/wff-cohort-1",headers:{authorization:"278bb077-1673-45bd-9597-3e9d7ec352d4","Content-Type":"application/json"}},t=function(){return fetch("".concat(e.baseUrl,"/cards"),{headers:e.headers}).then(o)},n=function(){return fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headers}).then(o)},o=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(res.status))};function r(e,t,n,o,r){var c=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0);c.id=e._id;var a=c.querySelector(".card__image"),i=c.querySelector(".card__delete-button"),s=c.querySelector(".card__title"),u=c.querySelector(".card__like-button"),l=c.querySelector(".card__like-count"),d=e.likes.find((function(e){return e._id===r}));return a.src=e.link,a.alt=s.textContent=e.name,l.textContent=e.likes.length,a.addEventListener("click",n),e.owner._id!=r?i.style.display="none":i.addEventListener("click",(function(){t(c.id)})),d&&u.classList.add("card__like-button_is-active"),u.addEventListener("click",(function(){o(u,l,c.id)})),c}function c(t,n,r){t.classList.contains("card__like-button_is-active")?function(t){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(t),{method:"DELETE",headers:e.headers}).then(o)}(r).then((function(e){t.classList.remove("card__like-button_is-active"),n.textContent=e.likes.length})).catch(console.error):function(t){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(t),{method:"PUT",headers:e.headers}).then(o)}(r).then((function(e){t.classList.add("card__like-button_is-active"),n.textContent=e.likes.length})).catch(console.error)}function a(e){e.classList.add("popup_is-animated"),setTimeout((function(){e.classList.add("popup_is-opened"),e.classList.remove("popup_is-animated")}),0),document.addEventListener("keydown",s),document.addEventListener("mousedown",u)}function i(e){e.classList.add("popup_is-animated"),setTimeout((function(){e.classList.remove("popup_is-opened")}),0),setTimeout((function(){e.classList.remove("popup_is-animated")}),600),document.removeEventListener("keydown",s),document.removeEventListener("mousedown",u)}function s(e){"Escape"===e.key&&i(document.querySelector(".popup_is-opened"))}function u(e){e.target.classList.contains("popup_is-opened")&&i(e.target)}function l(e,t,n,o){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n),r.classList.remove(o)}function d(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n)):(t.disabled=!0,t.classList.add(n))}function p(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);n.forEach((function(n){l(e,n,t.inputErrorClass,t.errorClass)})),o.classList.add(t.inactiveButtonClass)}var f=[t,n],m=document.querySelector(".popup_type_edit"),_=document.querySelector(".profile__edit-button"),v=document.forms["edit-profile"],h=v.elements.name,y=v.elements.description,S=v.querySelector(".popup__button"),b=document.querySelector(".profile__image"),L=document.querySelector(".profile__title"),q=document.querySelector(".profile__description"),C=document.querySelector(".popup_type_edit-avatar"),E=document.querySelector(".profile__image-edit"),k=document.forms["edit-avatar"],g=k.elements.url,x=k.querySelector(".popup__button"),T=document.querySelector(".popup_type_new-card"),U=document.querySelector(".profile__add-button"),A=document.querySelector(".popup_type_delete-card"),w=document.forms["new-place"],B=w.elements["place-name"],D=w.elements.link,P=w.querySelector(".popup__button"),N=document.forms["delete-card"],O=N.querySelector(".popup__button"),j=document.querySelector(".popup_type_image"),J=j.querySelector(".popup__image"),M=j.querySelector(".popup__caption"),H=document.querySelectorAll(".popup__close"),I=document.querySelector(".places__list"),V="",z={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function F(e){J.src=e.target.src,J.alt=M.textContent=e.target.alt,a(j)}function G(e){O.dataset.id=e,a(A)}function K(e){i(e.target.closest(".popup"))}Promise.all(f).then((function(){n().then((function(e){V=e._id,L.textContent=e.name,q.textContent=e.about,b.style.backgroundImage="url('".concat(e.avatar,"')")})).catch(console.error),t().then((function(e){e.forEach((function(e){!function(e,t){t.append(r(e,G,F,c,V))}(e,I)}))})).catch(console.error)})),E.addEventListener("click",(function(){k.reset(),p(k,z),a(C)})),_.addEventListener("click",(function(){h.value=L.textContent,y.value=q.textContent,p(v,z),a(m)})),U.addEventListener("click",(function(){w.reset(),p(w,z),a(T)})),H.forEach((function(e){e.addEventListener("click",K)})),v.addEventListener("submit",(function(t){t.preventDefault(),S.textContent="Сохранение...",function(t,n){return fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:t,about:n})}).then(o)}(h.value,y.value).then((function(e){L.textContent=e.name,q.textContent=e.about,i(m)})).catch(console.error).finally((function(){S.textContent="Сохранить"}))})),k.addEventListener("submit",(function(t){var n;t.preventDefault(),x.textContent="Сохранение...",(n=g.value,fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:n})}).then(o)).then((function(e){b.style.backgroundImage="url('".concat(e.avatar,"')"),i(C)})).catch(console.error).finally((function(){x.textContent="Сохранить"}))})),w.addEventListener("submit",(function(t){t.preventDefault(),P.textContent="Сохранение...";var n,a,s={name:B.value,link:D.value};(n=s.name,a=s.link,fetch("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify({name:n,link:a})}).then(o)).then((function(e){I.prepend(r(e,G,F,c)),i(T)})).catch(console.error).finally((function(){P.textContent="Сохранить"}))})),N.addEventListener("submit",(function(t){t.preventDefault();var n,r=O.dataset.id;(n=r,fetch("".concat(e.baseUrl,"/cards/").concat(n),{method:"DELETE",headers:e.headers}).then(o)).then((function(){document.querySelector("[id='".concat(r,"']")).remove(),i(A)})).catch(console.error)})),function(e){Array.from(document.querySelectorAll("".concat(e.formSelector))).forEach((function(t){!function(e,t,n,o,r,c){var a=Array.from(e.querySelectorAll("".concat(t))),i=e.querySelector(n);d(a,i,o),a.forEach((function(t){t.addEventListener("input",(function(){!function(e,t,n,o){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?l(e,t,n,o):function(e,t,n,o,r){var c=e.querySelector(".".concat(t.id,"-error"));c.textContent=n,t.classList.add(o),c.classList.add(r)}(e,t,t.validationMessage,n,o)}(e,t,r,c),d(a,i,o)}))}))}(t,e.inputSelector,e.submitButtonSelector,e.inactiveButtonClass,e.inputErrorClass,e.errorClass)}))}(z)})();