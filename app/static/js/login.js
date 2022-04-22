// const formulary  = document.getElementById('login__form');
// const inputs     = document.querySelectorAll('.login__form-group input');
// const regex      = {
//     user: /^[a-zA-Z0-9\_\-]{6,12}/g,
//     pass: /^.{8,24}/g,
// };
// const fields     = {
//     user: false,
//     pass: false,
// };
// //
// function field_validation(regex, input, field, flag=true) {
//     if ( regex.test(input.value) && flag === true ){
//         document.getElementById(`login_input-${field}`).classList.remove('error');
//         document.getElementById(`login_input-${field}`).style.borderColor = '#fff';
//         document.getElementById(`login_input-${field}`).style.borderColor = '#fff';
//         fields[field] = true;
//         flag = false;
//     } else {
//         document.getElementById(`login_input-${field}`).classList.add('error');
//         document.getElementById(`login_input-${field}`).style.borderColor = '#a00';
//         document.getElementById(`login_input-${field}`).style.borderColor = '#a00';
//         fields[field] = false;
//         flag = true;
//     }
// }
// function form_validation(e) {
//     switch (e.target.name) {
//         case 'user':
//             field_validation(regex.user, e.target, 'user');
//             break;
//         case 'pass':
//             field_validation(regex.pass, e.target, 'pass');
//             break;
//         default: break;
//     }
// }
// inputs.forEach( input => {
//     input.addEventListener('keyup', form_validation);
//     input.addEventListener('blur', form_validation);
// })
// formulary.addEventListener('submit', e => {
//     if (!fields.user && !fields.pass) {
//         e.preventDefault();
//     }
// });