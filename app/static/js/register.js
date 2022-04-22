document.addEventListener('DOMContentLoaded', () => {
    register_js();
});

function register_js(){
    category_selector();
    age_selector();
    genre_selector();
    registerValidation();
}

function category_selector(){
    const label= document.querySelector('#register_category-label');
    const list = document.querySelector('#list_category');
    const opts = document.querySelectorAll('#list_category a');
    const span = document.querySelector('#register_category-label span');
    const icon = document.querySelector('#register_category-label i');
    const disfocus = document.createElement('DIV');
    const selection = document.getElementById('register_category');
    //
    opts.forEach( opt => opt.addEventListener('click', e => {
                e.preventDefault();
                span.textContent = opt.textContent;
                selection.setAttribute('value',opt.textContent);
                // console.log(`Option: ${opt.textContent}\nSpan: ${span.textContent}\nSelection: ${selection.textContent}`);
            }
        )
    );
    label.addEventListener('click', e => {
        list.style.transform = 'scale(1,1)';
        document.querySelector('body').style.position = 'relative';
        document.querySelector('body').appendChild(disfocus);
        disfocus.classList.add('disfocus');
        label.style.borderBottomLeftRadius = '0';
        label.style.borderBottomRightRadius = '0';
        label.addEventListener('mouseleave', e => {
            list.style.transform = 'scale(0,0)';
            disfocus.remove();
            label.style.borderBottomLeftRadius = '.8rem';
            label.style.borderBottomRightRadius = '.8rem';
        });
    });
}

function age_selector() {
    const input_birth = document.getElementById('register_input-birth');
    const birth = document.getElementById('birth');
    //
    input_birth.addEventListener('focusout', e => {
        let birth_aux = input_birth.value;
        birth.setAttribute('value',birth_aux.toString());
        console.log(birth.innerHTML);
    });
}

function genre_selector() {document.querySelectorAll('.radio').forEach( radio => radio.addEventListener('click', e => genre_selector_aux(radio.value)))}
function genre_selector_aux(value) {document.getElementById('genre').setAttribute('value',value)}

//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//
const registerValidation = () => {
    const formulary  = document.getElementById('register__form');
    const inputs     = document.querySelectorAll('.register__form-group input');
    const regex      = {
        user: /^[a-zA-Z0-9\_\-]{6,12}/g,
        pass: /^.{8,24}/g,
        name: /^[a-zA-ZÀ-ÿ\s]{6,64}/g,
        mail: /^[a-zA-Z0-9\.\_\-]+@+[a-zA-Z0-9\_\-\.]+\.[a-zA-Z0-9\_\.\-]/g
    };
    const fields     = {
        user: false,
        pass: false,
        fullname: false,
        email: false
    };
    //
    document.getElementById('register_input-pass').addEventListener('keyup', password_validation);
    document.getElementById('register_input-passconfirm').addEventListener('keyup', password_validation);
    function password_validation() {
        const password         = document.getElementById('register_input-pass');
        const password_confirm = document.getElementById('register_input-passconfirm');
        //
        if ( password.value != password_confirm.value ) {
            password.classList.add('error');
            password_confirm.classList.add('error');
            document.getElementById('pass-error').style.display = 'inline-block';
            document.getElementById('passconfirm-error').style.display = 'inline-block';
            //
            fields['pass'] = false;
        } else {
            password.classList.remove('error');
            password_confirm.classList.remove('error');
            document.getElementById('pass-error').style.display = 'none';
            document.getElementById('passconfirm-error').style.display = 'none';
            //
            fields['pass'] = true;
        }
    }
    function field_validation(regex, input, field, flag=true) {
        if ( regex.test(input.value) && flag === true ){
            document.getElementById(`register_input-${field}`).classList.remove('error');
            document.getElementById(`register_input-${field}`).style.borderColor = '#fff';
            document.getElementById(`register_input-${field}`).style.borderColor = '#fff';
            document.getElementById(`${field}-error`).style.display = 'none';
            fields[field] = true;
            flag = false;
        } else {
            document.getElementById(`register_input-${field}`).classList.add('error');
            document.getElementById(`register_input-${field}`).style.borderColor = '#a00';
            document.getElementById(`register_input-${field}`).style.borderColor = '#a00';
            document.getElementById(`${field}-error`).style.display = 'inline-block';
            fields[field] = false;
            flag = true;
        }
    }
    function form_validation(e) {
        switch (e.target.name) {
            case 'fullname':
                field_validation(regex.name, e.target, 'fullname');
                break;
            case 'user':
                field_validation(regex.user, e.target, 'user');
                break;
            case 'email':
                field_validation(regex.mail, e.target, 'email');
                break;
            default: break;
        }
    }
    inputs.forEach( input => {
        input.addEventListener('keyup', form_validation);
        input.addEventListener('blur', form_validation);
    })
    formulary.addEventListener('submit', e => {
        if (!fields.name && !fields.user && !fields.email && !fields.pass) {
            e.preventDefault();
        }
    });
}