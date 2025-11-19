import { useEffect, useState } from 'react';
import api from '../config/api.config';


export function useDashboard() {
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({ tasks: 0, projects: 0, teams: 0 });
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);


  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        // Use the api helper if it's an axios instance or has request method
        if (api && api.get) {
          const [sRes, aRes] = await Promise.all([
            api.get('/dashboard/stats'),
            api.get('/dashboard/activities'),
          ]);
          if (!mounted) return;
          setStats(sRes.data || {});
          setActivities(aRes.data || []);
        } else {
          const base = api?.baseURL || '';
          const sRes = await fetch(`${base}/dashboard/stats`);
          const aRes = await fetch(`${base}/dashboard/activities`);
          if (!mounted) return;
          setStats(sRes.ok ? await sRes.json() : {});
          setActivities(aRes.ok ? await aRes.json() : []);
        }
      } catch (err) {
        if (mounted) setError(err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();


    return () => { mounted = false; };
  }, []);


  return { loading, stats, activities, error };
}