import React, {useEffect, useState} from 'react';
import MaterialTable from 'material-table'
import {Redirect} from 'react-router-dom'
import {formatDateTime} from "../../utils"
import toast from "../../utils/toast";

function List() {
    const [getUsers, setUsers] = useState();
    const [getRedirect, setRedirect] = useState();

    const fetchUsers = () =>{
        fetch(`http://${process.env.SERVER_HOST}:8000/users`)
            .then((res) => res.json())
            .then(res => setUsers(res))
    }

    const deleteExploration = (id) =>{
        fetch(`http://${process.env.SERVER_HOST}:8000/usersdelete/` + id)
            .then(res => res.json())
            .then((res) =>{
                if(res && res.err){
                    toast.error("Korisnik je koordinator na nekom istraživanju. Ne može biti obrisan.")
                }else{
                    toast.success("Uspešno obrisano")
                }
            })
            .then(() => fetchUsers())
            .catch(err => toast.error(err))
    }

    useEffect(() =>{
        fetchUsers()
    }, [])


    if(getRedirect){
        return <Redirect push to={getRedirect}/>
    }

    return (
        <MaterialTable
            title={"Korisici"}
            columns={[
                {title: "Ime i prezime", field: "name"},
                {title: "Email", field: "email"},
                {title: "Pristup", field: "role"},
                {title: "Datum rođenja", field: "birthday", render: (rowData) => <span>{formatDateTime(rowData.birthday)}</span>},

            ]}
            actions={[
                rowData =>({
                    icon: "visibility",
                    tooltip: "Prikaži korisnika",
                    onClick: () => {
                        setRedirect(`/korisnici/${rowData._id}/show`)
                    }
                }),
                rowData => ({
                    icon: 'delete',
                    tooltip: 'Obriši korisnika',
                    onClick: () => {
                        deleteExploration(rowData._id)
                    }
                }),
                rowData => ({
                    icon: 'add',
                    tooltip: 'Dodaj korisnika',
                    onClick: ()=> setRedirect('/korisnici/new')
                })
            ]}
            data={getUsers}
            localization={{
                header: {
                    actions: ""
                }
            }}

        />
    )
}

export default List;
