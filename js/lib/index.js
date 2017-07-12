
const campos = [
    document.querySelector('#data'),
    document.querySelector('#quantidade'),
    document.querySelector('#valor'),
];

let tbody = document.querySelector('table tbody');

const submeteForm = function submeteForm(e){
    e.preventDefault();
    console.log(e);
    let newTr = document.createElement('tr');

    campos.forEach((c) => {
        let newTd = document.createElement('td');
        newTd.textContent = c.value;
        newTr.appendChild(newTd);
    });

    let tdVolume = document.createElement('td');
    tdVolume.textContent = campos[1].value * campos[2].value;
    newTr.appendChild(tdVolume);
    console.log(tbody);
    tbody.appendChild(newTr);

    e.target.reset();
    campos[0].focus();

}

document.querySelector('.form').addEventListener('submit', submeteForm);