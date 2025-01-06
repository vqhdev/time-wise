import { DateTime } from 'luxon';

export default function useGlobalTime() {
  const [time, setTime] = useState(DateTime.now());
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(DateTime.now());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return time;
}
