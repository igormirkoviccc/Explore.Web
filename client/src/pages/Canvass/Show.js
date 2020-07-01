import React, {useState, useEffect, Fragment} from 'react';

import '../../App.css';
import Form from "../../components/Explorations/Form";
import AddQuestionIS from "../../components/Questions/AddQuestionIS";



export default function EditExploration({match}) {
    const [getQuestion, setQuestions] = useState([]);

    return (
        <Fragment>
            <AddQuestionIS/>
        </Fragment>
    )
}

