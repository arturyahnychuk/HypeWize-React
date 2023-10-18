import axios from 'axios';
import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

export default function VerifyEmail() {

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
                `${import.meta.env.VITE_API_ENDPOINT}/auth/verify-email?token=${token}`, {}, config
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