import React, { useState, type Dispatch, type SetStateAction } from "react";
import axios from "axios";
import { CircleX } from 'lucide-react';
import type { User } from "../types/user";
import { useUser } from "../hooks/useUser";

const CreateRoom = ({
    setShowCreateRoom,
    users
}: {
    setShowCreateRoom: Dispatch<SetStateAction<boolean>>,
    users: User[]
}) => {
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    const [groupName, setGroupName] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const { user } = useUser()

    const toggleUserSelection = (userId: string) => {
        setSelectedUsers((prev) =>
            prev.includes(userId)
                ? prev.filter((id) => id !== userId)
                : [...prev, userId]
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!groupName || selectedUsers.length === 0) {
            setMessage("Please enter a group name and select at least one user.");
            return;
        }

        setLoading(true);
        setMessage("");

        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/chat/createroom`, {
                name: groupName,
                createdBy: user?._id,
                members: selectedUsers,
            });

            setMessage(`Group "${res.data.name}" created successfully!`);
            setGroupName("");
            setSelectedUsers([]);
        } catch (err) {
            console.error(err);
            setMessage("Failed to create group.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowCreateRoom(false)}
        >
            <div
                className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto "
                onClick={(e) => {

                    e.stopPropagation()
                }}
            >
                <div className="p-4 border-b border-gray-100 space-y-2">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-800">Create a New Group</h2>
                        <CircleX
                            className="hover:text-gray-500"
                            onClick={() => setShowCreateRoom(false)}
                        />
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Group Name Input */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Group Name</label>
                            <input
                                type="text"
                                value={groupName}
                                onChange={(e) => setGroupName(e.target.value)}
                                placeholder="Enter group name"
                                className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>

                        {/* User Selection List */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Select Members
                            </label>
                            <div className="max-h-48 overflow-y-auto rounded-md p-2 space-y-2 ">
                                {users.map((user) => (
                                    <label
                                        key={user._id}
                                        className="flex items-center justify-between cursor-pointer hover:bg-gray-200 p-1"
                                    >
                                        <div>
                                            <p className="font-medium text-gray-700">{user.name}</p>
                                            {/* <p className="text-xs text-gray-500">{user.email}</p> */}
                                        </div>
                                        <input
                                            type="checkbox"
                                            checked={selectedUsers.includes(user._id)}
                                            onChange={() => toggleUserSelection(user._id)}
                                            className="accent-blue-500"
                                        />
                                    </label>
                                ))}
                                {users.length < 1 && (
                                    <span className="text-md ">No users found</span>
                                )}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#044c69] text-white py-2 rounded-md hover:bg-[#055c6a] transition"
                        >
                            {loading ? "Creating..." : "Create Group"}
                        </button>
                    </form>

                    {/* Message */}
                    {message && (
                        <p
                            className={`text-sm mt-3 ${message.startsWith("✅") ? "text-green-600" : "text-red-600"
                                }`}
                        >
                            {message}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
export default CreateRoom;
