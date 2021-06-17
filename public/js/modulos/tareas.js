import axios from 'axios';

const tareas = document.querySelector('.listado-pendientes');

if(tareas){

    tareas.addEventListener('click', e =>{
        //console.log(e.target.classList);
        if(e.target.classList.contains('fa-check-circle')){
            const icono = e.target;
            const idTarea = icono.parentElement.parentElement.dataset.tarea;

            //haacer request hacioa /tareas/id
            const url = `${location.origin}/tareas/${idTarea}`

            axios.patch(url, { idTarea })
                .then(res =>{
                    if(res.status === 200){
                        icono.classList.toggle('completo');
                    }
                })
        }
    })
}

export default tareas;