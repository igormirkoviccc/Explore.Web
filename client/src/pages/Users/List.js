import React, {useEffect, useState} from 'react';
import MaterialTable from 'material-table'
import {Redirect} from 'react-router-dom'
import {formatDateTime} from "../../utils"
import toast from "../../utils/toast";
import ModalIS from "../../components/ModalIS";

function List() {
    const [getUsers, setUsers] = useState();
    const [getRedirect, setRedirect] = useState();
    const [deleteModal, setDeleteModal] = useState();
    const [deletedItem, setDeleteItem] = useState();

    const fetchUsers = () =>{
        fetch(`http://${process.env.REACT_APP_SERVER_HOST}:8000/users`, {
            headers: {
                'x-access-token': localStorage.getItem('auth_token')
            }
        })
            .then(async (res) => {
                if(res.status != 200){
                    res = await res.json();
                    toast.error(res.message)
                }else{
                    res = await res.json();
                    setUsers(res);
                }
            })
    }

    const deleteUser = () =>{
        fetch(`http://${process.env.REACT_APP_SERVER_HOST}:8000/usersdelete/` + deletedItem, {
            headers: {
                'x-access-token': localStorage.getItem('auth_token')
            }
        })
            .then(async (res) => {
                if(res.status != 200){
                    res = await res.json();
                    toast.error(res.message)
                }else{
                    res = await res.json();
                    toast.success("Uspešno obrisano")
                    fetchUsers()
                }
            })
    }

    const handleModal = () =>{
        setDeleteModal(false)
    }

    useEffect(() =>{
        fetchUsers()
    }, [])


    if(getRedirect){
        return <Redirect push to={getRedirect}/>
    }

    return (
        <>
            {deleteModal &&
            <ModalIS
                action={deleteUser}
                handleOpen={handleModal}
            />
            }
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
                        setDeleteModal(true);
                        setDeleteItem(rowData._id)
                        // deleteUser(rowData._id)
                    }
                }),
                {
                    icon: 'add',
                    tooltip: 'Dodaj korisnika',
                    isFreeAction: true,
                    onClick: ()=> setRedirect('/korisnici/new')
                }
            ]}
            data={getUsers}
            localization={{
                header: {
                    actions: ""
                }
            }}

        />
        </>
    )
}

export default List;
