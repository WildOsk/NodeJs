import axios from 'axios';
import Swal from 'sweetalert2';

const tareas = document.querySelector('.listado-pendientes');

if(tareas){

    tareas.addEventListener('click', e =>{
        //console.log(e.target.classList);
        if(e.target.classList.contains('fa-check-circle')){
            const icono = e.target;
            const idTarea = icono.parentElement.parentElement.dataset.tarea;

            //haacer request hacioa /tareas/id
            const url = `${location.origin}/tareas/${idTarea}`;

            axios.patch(url, { idTarea })
                .then(res =>{
                    if(res.status === 200){
                        icono.classList.toggle('completo');
                    }
                })
        }

        if(e.target.classList.contains('fa-trash')){
            const tareaHTML = e.target.parentElement.parentElement;
            const idTarea = tareaHTML.dataset.tarea;

                  Swal.fire({
                    title: 'Deseas borrar esta tarea?',
                    text: "Una tarea eliminada no se puede recuperar",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, borrar',
                    cancelButtonText: 'No, cancelar'
            
                  }).then((result) => {
                    if (result.isConfirmed) {
                        const url = `${location.origin}/tareas/${idTarea}`;
                        //enviar el delete por medio de axios
                        axios.delete(url, { params: { idTarea }})
                        .then(res =>{
                            console.log(res);
                            if(res.status === 200){
                                //Eliminar el nodo
                                tareaHTML.parentElement.removeChild(tareaHTML);

                                //opcional una alerta
                                Swal.fire(
                                    'Tarea eliminada',
                                    res.data.Swal,
                                    'success'
                                )
                            }
                        })
                    }
                })

        }
    })
}

export default tareas;