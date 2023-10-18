import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

import { GOOGLE_AUTH_URL } from '@/apis/endpoint';

const Google = () => {
    const [confirmResult, setConfirmResult] = useState<string>("");
    
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const code = searchParams.get("code");

    // const accessToken = localStorage.getItem("access_token");
    const ConfirmGoogleAuth = async () => {
        try {
            // const config = {
            //     headers: {
            //         Authorization: `Bearer ${accessToken}`,
            //     },
            // };

            const res = await axios.post(
                `${ GOOGLE_AUTH_URL }?code=${code}`, {}
            );

            if (res.data) {
                setConfirmResult("Google Connected Successfully");
                localStorage.setItem("access_token", res.data.tokens.access.token);
                // console.log(res.data);
                navigate("/projects");
            }
            else setConfirmResult("Error, please check log");

            console.log("res:", res);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (code) ConfirmGoogleAuth();
    }, []);

    return (
        <div>
            {
                confirmResult ? <p>{confirmResult}</p> : <>Verifying</>
            }
        </div>
    )
}

export default Google;