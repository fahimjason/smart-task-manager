import { useEffect, useState } from 'react';
import api from '../config/api.config';

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    (async () => {
      try {
        const res = await fetch(`${api.baseURL || ''}/tasks`);
        const json = res.ok ? await res.json() : [];
        if (mounted) setTasks(json);
      } catch (err) {
        if (mounted) setError(err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  return { tasks, loading, error };
}
