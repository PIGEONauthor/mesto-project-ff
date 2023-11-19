export const getInitialCards = () => {
    
    fetch('https://nomoreparties.co/v1/wff-cohort-1/cards', {
      headers: {
        authorization: '278bb077-1673-45bd-9597-3e9d7ec352d4'
      }
    })
    .then(res => res.json())
    .then((result) => {
      console.log(result);
    });
    
}