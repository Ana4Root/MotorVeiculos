'use strict'
/*modal do carro*/

const openmodal = () => document.getElementById('modal')
    .classList.add('modalatv')

const closemodal = () => {
    clearfields()
    document.getElementById('modal').classList.remove('modalatv')
}

document.getElementById('btncadca')
    .addEventListener('click', openmodal)

document.getElementById('modalca')
    .addEventListener('click', closemodal)

/*modal do motorista*/

const openmodalm = () => document.getElementById('modalm')
    .classList.add('modalatv')

const closemodalm = () => {
    clearfields()
    document.getElementById('modalm').classList.remove('modalatv')
}

document.getElementById('btncadmo')
    .addEventListener('click', openmodalm)

document.getElementById('modalmca')
    .addEventListener('click', closemodalm)

const getLS= () => JSON.parse(localStorage.getItem('db_carro')) ?? []
const setLocalStorage = (dbCarro) => localStorage.setItem("db_carro", JSON.stringify(dbCarro))

const createCarro = (carro) => {
    const dbCarro = getLS()
    dbCarro.push (carro)
    setLocalStorage(dbCarro)
}

const getLSM= () => JSON.parse(localStorage.getItem('db_moto')) ?? []
const setLocalStorageM = (dbMoto) => localStorage.setItem("db_moto", JSON.stringify(dbMoto))

const createMoto = (motorista) => {
    const dbMoto = getLS()
    dbMoto.push (motorista)
    setLocalStorage(dbMoto)
}

const readCarro = () => getLS()
const readMoto = () => getLSM()

const updateCarro = (index, carro) =>{
    const dbCarro = readCarro()
    dbCarro[index] = carro
    setLocalStorage(dbCarro)
}

const updateMoto = (index, motorista) =>{
    const dbMoto = readMoto()
    dbMoto[index] = motorista
    setLocalStorageM(dbMoto)
}

const deleteCarro = (index) => {
    const dbCarro = readCarro()
    dbCarro.splice(index, 1)
    setLocalStorage(dbCarro)
}

const deleteMoto = (index) => {
    const dbMoto = readMoto()
    dbMoto.splice(index, 1)
    setLocalStorageM(dbMoto)
}

const isValidFields = () => {
    return document.getElementById('modalfc').reportValidity()
}

const isValidFieldsm = () => {
    return document.getElementById('modalfm').reportValidity()
}

const clearfields = () =>{
    const fields = document.querySelectorAll('.modalfie')
    fields.forEach(field => field.value ="")
}

const data = new Date()

function randomNumber(min, max) { 
    return Math.floor(Math.random() * (max - min) + min);
} 

const idc = Math.floor

const saveCarro = () => {
    if (isValidFields()){
        const carro = {
            placa: document.getElementById('placa').value,
            marca: document.getElementById('marca').value,
            veiculo: document.getElementById('veiculo').value,
            Tdo: document.getElementById('tdo').value,
            data: data.value,
            idc: idc.value
        }
        createCarro(carro)
        updateTable()
        closemodal()
    }
}

const saveMoto = () => {
    if (isValidFieldsm()){
        const motorista = {
            cdm: document.getElementById('cdm').value,
            nome: document.getElementById('nome').value,
            telefone: document.getElementById('telefone').value,
            cnh: document.getElementById('cnh').value
        }
        createMoto(motorista)
        updateTable()
        closemodalm()
    }
}

document.getElementById('salvarC')
    .addEventListener('click', saveCarro)

document.getElementById('salvarM')
    .addEventListener('click', saveMoto)

const createRow = (carro, index) =>{
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
    <td>${carro.data}</td>
    <td>${carro.idc}</td>
    <button id="visualizar-${index} " class="btnVee" type="button"> 
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                Visualizar
                                </button>
                            <button id="editar-${index} " class="btnVee" type="button"> 
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                Editar
                            </button>
                            <button id="excluir-${index} " class="btnVee" type="button">
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                Excluir
                            </button>
   `
   document.querySelector('#tbform>tbody').appendChild(newRow)
}

const cleartbform = () =>{
    const rows = document.querySelectorAll('#tbform>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () =>{
    const dbCarro = readCarro()
    cleartbform()
    dbCarro.forEach(createRow)
}

const fillfields = (carro) => {
    data = carro.data
    idc = carro.idc
}

const editcarro = (index) =>{
    const carro =readCarro()[index]
    fillfields(carro)
} 

const editDelete = (ev) =>{
    if(ev.target.type == 'button'){
        const [action,index] = ev.target.id.split('-')
        if (action == 'edit'){
            editcarro(index)
        } else {

        }
    }
}

document.querySelector('#tbform>tbody')
    .addEventListener('click',editDelete)