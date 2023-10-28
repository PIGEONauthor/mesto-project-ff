
export {openModal, closeModal};

function openModal(popup){
    
    setTimeout(() => {
      popup.classList.add('popup_is-opened');
      popup.classList.remove('popup_is-animated');
    }, 0);
    
    popup.classList.add('popup_is-animated');

    window.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape'){
        closeModal(popup);
      }
    })

}

function closeModal(popup){

    setTimeout(() => {
      popup.classList.remove('popup_is-opened');
    }, 0);
      
    popup.classList.add('popup_is-animated');

    window.removeEventListener('keydown', (evt) => {
        if (evt.key === 'Escape'){
          closeModal(popup);
        }
    })

}