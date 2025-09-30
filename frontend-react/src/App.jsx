import React, {useState} from "react";
import {Formulario} from "./modules/form/components/Formulario";
import {FormList} from "./modules/form/components/FormList";

export default function App() {
    const [refreshKey, setRefreshKey] = useState(0);

    const handleFormSaved = () => {
        setRefreshKey(prev => prev + 1);
    };

    return (
        <div className="container py-5">
            <div className="text-center mb-5">
                <h1 className="display-4 text-primary fw-bold">
                    Sistema de Gestión de Formularios
                </h1>
                <p className="lead text-muted">CRUD Completo con Node.js y React</p>
            </div>

            <div className="row g-4">
                <div className="col-lg-5">
                    <Formulario onFormSaved={handleFormSaved}/>
                </div>
                <div className="col-lg-7">
                    <FormList refreshTrigger={refreshKey}/>
                </div>
            </div>
        </div>
    );
}