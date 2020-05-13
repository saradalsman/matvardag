export default function authId() {
    let user = JSON.parse(localStorage.getItem('user'));
  
    if (user && user.id) {
      return user.id ;
    } else {
      return ;
    }
  }
  