import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

import { VERIFY_EMAIL_URL } from '@/apis/endpoint';

const VerifyEmail = () => {
    const [searchParams] = useSearchParams();

    const token = searchParams.get("token");
    const accessToken = localStorage.getItem("access_token");

    const verifyEmail = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            };

            const res = await axios.post(
                `${ VERIFY_EMAIL_URL }?token=${token}`, {}, config
            );

            console.log("res:", res);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (token) verifyEmail();
    }, []);

    return (
        <></>
    )
}

export default VerifyEmail;