import React, { useEffect, useState } from 'react';
import { useFirebase } from '../contexts/Context';
import { Navigate } from 'react-router-dom';

import { Spin } from 'antd';
import {app} from '../firebase/Firebase';
import { getAuth } from 'firebase/auth';

export default function ProtectedRoutes({children}) {
    const { firebase } = useFirebase();
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const unsubscribe = getAuth(app).onAuthStateChanged(user => {
            setIsAuthenticated(!!user);
            setLoading(false);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, [firebase]);

    if (loading) {
        return <div style={{height:'100vh',display:'flex',justifyContent:'center',alignItems:'center'}}>
            <Spin tip="Loading..." size='large'/>
        </div>; // Or your custom loading component
    }

    if (!isAuthenticated) {
        return <Navigate to="/" replace={true}/>;
    }

    return children;
}