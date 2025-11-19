import { useEffect, useState } from 'react';
import api from '../config/api.config';


export function useTeams() {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() => {
        let mounted = true;
        (async () => {
            setLoading(true);
            try {
                if (api && api.get) {
                    const res = await api.get('/teams');
                    if (mounted) setTeams(res.data || []);
                } else {
                    const base = api?.baseURL || '';
                    const res = await fetch(`${base}/teams`);
                    if (mounted && res.ok) setTeams(await res.json());
                }
            } catch (err) {
                if (mounted) setError(err);
            } finally {
                if (mounted) setLoading(false);
            }
        })();
        return () => { mounted = false; };
    }, []);


    return { teams, loading, error };
}