import React, {useEffect, useState} from 'react';
import MaterialTable from 'material-table'
import {Redirect} from "react-router-dom"
import {formatDateTime} from "../../utils"
import { Add } from "@material-ui/icons"
import toast from "../../utils/toast"



function List() {
    const [getExplorations, setExplorations] = useState();
    const [getRedirect, setRedirect] = useState();

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

    const deleteExploration = (id) =>{
        fetch(`http://${process.env.REACT_APP_SERVER_HOST}:8000/explorationsdelete/` + id)
            .then(res => res.json())
            .then(() => toast.success("Uspešno obrisano"))
            .then(() => fetchExplorations())
            .catch(err => toast.error(err))
    }

    useEffect(() =>{
        fetchExplorations()
    }, [])

    if(getRedirect){
        return <Redirect push to={getRedirect}/>
    }


    return (
        <MaterialTable
            title={"Istraživanja"}
            columns={[
                {title: "Naziv", field: "name"},
                {title: "Kordinator", field: "coordinator.name"},
                {title: "Datum pocetka", field: "beginDate", render: (rowData)=> <span>{formatDateTime(rowData.beginDate)}</span>},
                {title: "Datum kraja", field: "endDate", render: (rowData)=> <span>{formatDateTime(rowData.endDate)}</span>}
            ]}
            icons={{
                Add: props => <div><Add {...props} /></div>
            }}
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
                        deleteExploration(rowData._id)
                    }
                }),
                rowData =>({
                    icon: "add",
                    tooltip: "Dodaj istraživanje",
                    isFreeAction: true,
                    onClick: () => setRedirect(`/istrazivanja/new`)
                }),
            ]}
            data={getExplorations}
            options={{
                detailPanelColumnAlignment: "right",
            }}
            localization={{
                header: {
                    actions: ""
                }
            }}

        />
    )
}

export default List;
