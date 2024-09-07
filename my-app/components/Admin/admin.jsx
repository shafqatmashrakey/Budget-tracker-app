'use client';
import { useState, useEffect } from 'react';
import { supabase } from "@/utils/supabase/client";

export default function Admin() {
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchProfiles();
    }, []);

    async function fetchProfiles() {
        try {
            let { data, error } = await supabase.from('profile').select('*');
            if (error) throw error;
            setProfiles(data);
        } catch (error) {
            console.error('Error fetching profiles:', error);
            setError('Failed to fetch profiles: ' + error.message);
        }
        setLoading(false);
    }

    const toggleAdmin = async (profile) => {
        const newAdminStatus = !profile.IsAdmin;
        try {
            const { error } = await supabase.from('profile').update({ IsAdmin: newAdminStatus }).match({ id: profile.id });
            if (error) throw error;
            setMessage(`Admin status for ${profile.first_name} ${profile.last_name} updated.`);
            fetchProfiles(); // Refresh profiles
        } catch (error) {
            console.error('Error updating admin status:', error);
            setError('Failed to update admin status: ' + error.message);
        }
    };

    const deleteUser = async (profile) => {
        if (confirm(`Are you sure you want to delete ${profile.first_name} ${profile.last_name}?`)) {
            try {
                const { error } = await supabase.from('profile').delete().match({ id: profile.id });
                if (error) throw error;
                setMessage(`User ${profile.first_name} ${profile.last_name} deleted.`);
                fetchProfiles();
            } catch (error) {
                console.error('Error deleting user:', error);
                setError('Failed to delete user: ' + error.message);
            }
        }
    };

    const filteredProfiles = profiles.filter(profile =>
        profile.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        profile.last_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="admin-container">
            <h1 className="header">ADMIN PAGE</h1>
            {message && <p className="message">{message}</p>}
            <input
                type="text"
                placeholder="Search by name"
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-box"
            />
            <div className="profiles">
                {filteredProfiles.map((profile) => (
                    <div key={profile.id} className="profile">
                        <p>{profile.first_name} {profile.last_name} - Admin: {profile.IsAdmin ? 'Yes' : 'No'}</p>
                        <button onClick={() => toggleAdmin(profile)}>{profile.IsAdmin ? 'Remove Admin' : 'Make Admin'}</button>
                        <button onClick={() => deleteUser(profile)} style={{backgroundColor: 'red', color: 'white'}}>Delete</button>
                    </div>
                ))}
            </div>
            <style jsx>{`
                .admin-container {
                    padding: 20px;
                    background-color: #f0f0f0;
                }
                .header {
                    color: #333;
                    text-align: center;
                }
                .message {
                    color: green;
                    font-weight: bold;
                    text-align: center;
                }
                .search-box {
                    margin: 10px;
                    padding: 8px;
                    width: 95%;
                    font-size: 16px;
                }
                .profiles {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    padding: 10px;
                }
                .profile {
                    background-color: white;
                    border: 1px solid #ccc;
                    padding: 10px;
                    border-radius: 8px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                button {
                    margin-left: 10px;
                    padding: 5px 10px;
                    cursor: pointer;
                }
            `}</style>
        </div>
    );
}
