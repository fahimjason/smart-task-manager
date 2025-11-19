import { useEffect, useState } from 'react';
import api from '../config/api.config';


export function useProjects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() => {
        let mounted = true;
        (async () => {
            setLoading(true);
            try {
                if (api && api.get) {
                    const res = await api.get('/projects');
                    if (mounted) setProjects(res.data || []);
                } else {
                    const base = api?.baseURL || '';
                    const res = await fetch(`${base}/projects`);
                    if (mounted && res.ok) setProjects(await res.json());
                }
            } catch (err) {
                if (mounted) setError(err);
            } finally {
                if (mounted) setLoading(false);
            }
        })();
        return () => { mounted = false; };
    }, []);


    return { projects, loading, error };
}