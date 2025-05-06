import React, { useEffect } from 'react';
import { useRegistration } from '../context/RegistrationContext';
import { useNavigate, useParams } from 'react-router-dom';

function InvitationHandler() {
    const { registrationData, updateRegistrationData } = useRegistration();
    const navigate = useNavigate();
    const { invite_id } = useParams();

    useEffect(() => {
        if (invite_id) {
            updateRegistrationData('invite_id', invite_id);
            // console.log('invite_id', invite_id);
            // console.log('registrationData', registrationData);
        }
        navigate('/');
    }, []);

    return (
        <div>
            <h1>Invitation Handler</h1>
        </div>
    );
}

export default InvitationHandler;


