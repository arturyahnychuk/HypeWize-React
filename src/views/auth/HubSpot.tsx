import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

import { HUBSPOT_AUTH_URL } from '@/apis/endpoint';

const HubSpot = () => {
    const [confirmResult, setConfirmResult] = useState<string>("");

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const code = searchParams.get("code");

    const ConfirmHubSpotAuth = async () => {
        try {
            const res = await axios.post(
                `${ HUBSPOT_AUTH_URL }?code=${code}`, {},
            );

            if (res.data) {
                setConfirmResult("HubSpot Connected Successfully");
                localStorage.setItem("access_token", res.data.tokens.access.token);
                // console.log(res.data);
                navigate("/projects");
            }
            else setConfirmResult("Error, please check log");

            console.log("res:", res);
        } catch (error) {
            console.log(error);
            setConfirmResult("Error, please check log");
        }
    }

    useEffect(() => {
        if (code) ConfirmHubSpotAuth();
    }, []);

    return (
        <div>
            {
                confirmResult ? <p>{confirmResult}</p> : <>Verifying</>
            }
        </div>
    )
}

export default HubSpot;