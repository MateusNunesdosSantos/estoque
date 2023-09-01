const dadosGrid = document.querySelector('#dadosGrid')
const btnAdd = document.querySelector('#btnAdd')
const btnFecharPopup = document.querySelector('#btnFecharPopup')
const novoColaborador = document.querySelector('#novoColaborador') 
const btnGravarPopup = document.querySelector('#btnGravarPopup')
const btnCancelarPopup = document.querySelector('#btnCancelarPopup')
const telefones = document.querySelector('#telefones')
const telefone = document.querySelector('#telefone')

const nome = document.querySelector('#nome')
const tipo_colaborador = document.querySelector('#tipo_colaborador')
const s_status = document.querySelector('#s_status')

const foto = document.querySelector('#foto')
const imgFoto = document.querySelector('#imgFoto')



const endpoint_todosusuarios=`http://127.0.0.1:1880/todosusuarios`
fetch(endpoint_todosusuarios)
.then(res=>res.json())
.then(res=> {
    console.log(res)
    dadosGrid.innerHTML=""
    res.forEach(e => {
        const divlinha=document.createElement("div");
        divlinha.setAttribute("class","linhaGrid");

        const divc1=document.createElement("div");
        divc1.setAttribute("class","colunaLinhaGrid c1");
        divc1.innerHTML=e.id_user;
        divlinha.appendChild(divc1);

        const divc2=document.createElement("div");
        divc2.setAttribute("class","colunaLinhaGrid c2");
        divc2.innerHTML=e.nome;
        divlinha.appendChild(divc2);

        const divc3=document.createElement("div");
        divc3.setAttribute("class","colunaLinhaGrid c3");
        divc3.innerHTML=e.id_tipo_usuario;
        divlinha.appendChild(divc3);

        const divc4=document.createElement("div");
        divc4.setAttribute("class","colunaLinhaGrid c4");
        divc4.innerHTML=e.status;
        divlinha.appendChild(divc4);

        const divc5=document.createElement("div");
        divc5.setAttribute("class","colunaLinhaGrid c5");
        divlinha.appendChild(divc5);

        const imgStatus=document.createElement("img");
        imgStatus.setAttribute("src","../img/toggle_on.svg");
        imgStatus.setAttribute("class","iconeOp");
        divc5.appendChild(imgStatus);

        const imgEditar=document.createElement("img");
        imgEditar.setAttribute("src","../img/edit.svg");
        imgEditar.setAttribute("class","iconeOp");
        divc5.appendChild(imgEditar);

        const imgDelete=document.createElement("img");
        imgDelete.setAttribute("src","../img/lixeira.svg");
        imgDelete.setAttribute("class","iconeOp");
        divc5.appendChild(imgDelete);

        dadosGrid.appendChild(divlinha)
    });
})

const endpoint_tiposcolab=`http://127.0.0.1:1880/tiposcolab`
fetch(endpoint_tiposcolab)
.then(res =>res.json())
.then(res => {
    tipo_colaborador.innerHTML=""
    res.forEach(el => {
        const opt=document.createElement('option')
        opt.setAttribute("value", el.id_tipo_usuario)
        opt.innerHTML=el.decricao
        tipo_colaborador.appendChild(opt)
    })
})

btnAdd.addEventListener("click", (evt) => {
    novoColaborador.classList.remove("ocultarPopup")
})

btnFecharPopup.addEventListener("click", (evt) => {
    novoColaborador.classList.add("ocultarPopup")
})

btnGravarPopup.addEventListener("click", (evt) => {
    const tels=[...document.querySelectorAll(".numTel")];
    console.log(tels);
    let numTels=[];
    tels.forEach(t=>{
        numTels.push(t.innerHTML);
    });
    console.log(numTels)

    const dados = {
        nome : nome.value,
        id_tipo_usuario : tipo_colaborador.value,
        status : s_status.value,
        numTelefones : numTels,
        foto_usuario: imgFoto.getAttribute("src")

    }

    const cab = {
        method: 'post',
        body: JSON.stringify(dados)
    }

    const endpointnovocolab=`http://127.0.0.1:1880/novocolab`
    fetch(endpointnovocolab, cab)
    .then(res => {
        if (res.status==200) {
           alert('Novo colaborador gravado')
           nome.value=''
           tipo_colaborador.value=''
           s_status.value=''
           foto.value=''
           imgFoto.setAttribute('src', '#')
           telefones.innerHTML=''




        }else {
            alert('Erro ao gravar colaborador')

        }
    })
    console.log(dados)

    //novoColaborador.classList.add("ocultarPopup")
})

btnCancelarPopup.addEventListener("click", (evt) => {
    novoColaborador.classList.add("ocultarPopup")
})


telefone.addEventListener('keyup', (evt) => {
    if(evt.key==='Enter'){
        if(evt.target.value.length >= 8){
        const divTel=document.createElement('div')
        divTel.setAttribute('class', 'tel')

        const numTel=document.createElement('div')
        numTel.setAttribute('class', 'numTel')
        numTel.innerHTML=evt.target.value
        divTel.appendChild(numTel)


        const delTel=document.createElement('img')
        delTel.setAttribute('src', '../img/lixeira.svg')
        delTel.setAttribute('class', 'delTel')
        delTel.addEventListener('click', (evt)=> {
            evt.target.parentNode.remove()
        })
        divTel.appendChild(delTel)

        telefones.appendChild(divTel)

        evt.target.value=""

    } else {
        alert('O número de telefone deve ter no mínimo 8 dígitos!')
    }

    }
})


const converte_imagem_b64=(localDestino, arquivoimg)=> {
    const obj=arquivoimg
    const reader=new FileReader()
    reader.addEventListener('load', (evt) => {
        localDestino.src=reader.result
    }) 
    if(obj) {
        reader.readAsDataURL(obj)
    }
}


foto.addEventListener('change', (evt) => {
    converte_imagem_b64(imgFoto, evt.target.files[0])
})