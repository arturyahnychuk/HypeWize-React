import { useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

import useAuthStore from "@/store/auth";
import { REQUEST_CONFIG } from '@/config/auth';
import { PAYMENT_API } from '@/apis/endpoint';

const CheckoutSession = () => {
    const location = useLocation();
    
    const { profileInfo, setProfileInfo } = useAuthStore();
    const { priceId, referral } = queryString.parse(location.search);
    
    // test url
    // http://localhost:5173/payments/create-checkout-session?priceId=price_1Nce3uA0lM4QIt080t7nTUU3&referral=1234

    useEffect(() => {
        if(priceId) {
            const userId = profileInfo?.id;
            const reqData = referral ? {
                    priceId,
                    userId,
                    referral
                } : {
                    priceId,
                    userId,
                }
            axios
                .post(`${ PAYMENT_API }/create-checkout-session`,
                    reqData, REQUEST_CONFIG)
                .then(response => {
                    const { url }= response.data;
                    window.location.href = url;
                })
                .catch(error => {
                    console.log(error);
                });
        } else {
            console.error("Missing priceId or referral");
        }
    }, [priceId, referral, profileInfo]);

    return (
        <div className='w-full h-screen'>
            <div className='flex flex-row items-center justify-center'>
                Creating Checkout Session...
            </div>
        </div>
    )
}

export default CheckoutSession;