window.addEventListener("load", ()=>{
    const form = document.querySelector("#formulario")
    const usuario = document.getElementById("usuario")
    const email = document.getElementById("email")
    const pass = document.getElementById("pass")
    const passConfirmar = document.getElementById("passConfirmar")

    form.addEventListener("submit",(e) =>{ 
        e.preventDefault()
        validaCampos()
    });

    const validaCampos = ()=> {
        //CAPTURA LOS VALORES INGRESADOS POR EL USUARIO
        const usuarioValor = usuario.value.trim()
        const emailValor = email.value.trim()
        const passValor = pass.value.trim()
        const passConfirmarValor = passConfirmar.value.trim()
        //VALIDANDO CAMPO USUARIO
        if(!usuarioValor){
            validaFalla(usuario, "Campo vacio")
        }else{
            validaOk(usuario)
        }  
        //VALIDANDO CAMPO EMAIL
        if(!emailValor){
            validaFalla(email, "Campo vacio")
        } else if (!validaEmail(emailValor)){
            validaFalla(email, "El email no es valido")
        }else{
            validaOk(email)
        }

        //VALIDANDO CAMPO PASSWORD
        const er = (/^(?=.*\d)(?=.*[a-z]).{6,18}$/)
        if(!passValor){
            validaFalla(pass, "Campo vacio")
        }else if (passValor.length < 8){
            validaFalla(pass,"Debe tener 8 caracteres minimo")
        }else if (!passValor.match(er)){
            validaFalla(pass, "Debe ser en minuscula y tener almenos un numero.")
        }else{
            validaOk(pass)
        }

        //VALIDANDO CAMPO CONFIRMACION
        if(!passConfirmarValor){
            validaFalla(passConfirmar, "Confirme su password")    
        }else if(passValor !== passConfirmarValor){
            validaFalla(passConfirmar, "El password no coincide")
        }else{
            validaOk(passConfirmar)
        }

    }

    const validaFalla = (input, msje) =>{
        const formControl = input.parentElement
        const aviso = formControl.querySelector("p")
        aviso.innerText = msje

        formControl.className ="formulario-control falla"

    }

    const validaOk = (input, msje) =>{
        const formControl = input.parentElement
        formControl.className = "formulario-control ok"


    }

    const validaEmail = (email) => {
        return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email));

    }
    
});