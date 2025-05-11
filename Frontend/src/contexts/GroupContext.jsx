import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';

const GroupContext = createContext();

export const GroupProvider = ({children}) => {
    const [startupsData, setStartUpsData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BASE_URL}`);
                setStartUpsData(res.data);
            } catch (error) {
                console.log("Error fetching groups:", error)
            } finally{
                setLoading(false);
            }
        }
    fetchGroups();
    }, []);

    return (
        <GroupContext.Provider value={{startupsData,loading}}>
               {children} 
        </GroupContext.Provider>
    );
};

export const useStartupsData = () => useContext(GroupContext);

