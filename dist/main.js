(()=>{"use strict";var e=document.querySelector("#card-template").content,t=document.querySelector(".places__list");function r(e){e.target.closest(".card").remove()}[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(n){var s,a,c,d,o,p,l;s=n,t.append((a=s,c=r,o=(d=e.querySelector(".card").cloneNode(!0)).querySelector(".card__image"),p=d.querySelector(".card__delete-button"),l=d.querySelector(".card__title"),o.src=a.link,o.alt=l.textContent=a.name,p.addEventListener("click",c),d))}))})();