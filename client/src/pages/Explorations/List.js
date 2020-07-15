import React, {useEffect, useState} from 'react';
import MaterialTable from 'material-table'
import {Redirect} from "react-router-dom"
import {formatDateTime} from "../../utils"
import toast from "../../utils/toast"
import ModalIS from "../../components/ModalIS";



function List() {
    const [getExplorations, setExplorations] = useState();
    const [getRedirect, setRedirect] = useState();
    const [deleteModal, setDeleteModal] = useState();
    const [deletedItem, setDeleteItem] = useState();

    const fetchExplorations = () =>{
        fetch(`http://${process.env.REACT_APP_SERVER_HOST}:8000/explorations`, {
            headers: {
                'x-access-token': localStorage.getItem('auth_token')
            }})
            .then(async (res) => {
                if(res.status != 200){
                    res = await res.json();
                    toast.error(res.message)
                }else{
                    res = await res.json();
                    setExplorations(res);
                }
            })
    }

    const deleteExploration = () =>{
        fetch(`http://${process.env.REACT_APP_SERVER_HOST}:8000/explorationsdelete/` + deletedItem, {
            headers: {
                'x-access-token': localStorage.getItem('auth_token')
            }})
            .then(async (res) => {
                if(res.status != 200){
                    res = await res.json();
                    toast.error(res.message)
                }else{
                    res = await res.json();
                    fetchExplorations(res);
                }
            })
    }

    const handleModal = () =>{
        setDeleteModal(false)
    }

    useEffect(() =>{
        fetchExplorations()
    }, [])

    if(getRedirect){
        return <Redirect push to={getRedirect}/>
    }


    return (
        <>
            {deleteModal &&
                <ModalIS
                    action={deleteExploration}
                    handleOpen={handleModal}
                />
            }
        <MaterialTable
            title={"Istraživanja"}
            columns={[
                {title: "Naziv", field: "name"},
                {title: "Kordinator", field: "coordinator.name"},
                {title: "Datum pocetka", field: "beginDate", render: (rowData)=> <span>{formatDateTime(rowData.beginDate)}</span>},
                {title: "Datum kraja", field: "endDate", render: (rowData)=> <span>{formatDateTime(rowData.endDate)}</span>}
            ]}
            actions={[
                rowData =>({
                    icon: "visibility",
                    tooltip: "Prikaži istraživanje",
                    onClick: () => {
                        setRedirect(`/istrazivanja/${rowData._id}/show`)
                    }
                }),
                rowData => ({
                    icon: 'delete',
                    tooltip: 'Obriši istraživanje',
                    onClick: () =>{
                        setDeleteModal(true);
                        setDeleteItem(rowData._id)
                        // deleteExploration(rowData._id)
                    }
                }),
                {
                    icon: "add",
                    tooltip: "Dodaj istraživanje",
                    isFreeAction: true,
                    onClick: () => setRedirect(`/istrazivanja/new`)
                },
            ]}
            options={{
                detailPanelColumnAlignment: "right",
                exportButton: true,
                exportAllData: true,
                exportDelimiter: ";"
            }}
            localization={{
                header: {
                    actions: ""
                }
            }}
            data={getExplorations}
        />
        </>
    )
}

export default List;
