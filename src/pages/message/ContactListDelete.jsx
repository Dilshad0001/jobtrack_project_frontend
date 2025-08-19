import React, { useState } from "react";
import { Trash } from "lucide-react";
import { axiosInstance } from "../../store/AxioInstance";

function ContactListDelete({ contact_id, onDeleted }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    if (!contact_id) return;
    console.log("CONTACT ID", contact_id);

    setLoading(true);
    setError("");
    try {
        alert ('are you sure remove ?')
      const response = await axiosInstance.delete(
        `chat/chat/contact-list/`,
        { data: { contact_id } }   // ✅ send in request body (not params)
      );

      if (response.status === 200 || response.status === 204) {
        if (onDeleted) onDeleted(contact_id); // notify parent
      } else {
        setError("Failed to delete contact");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleDelete}
        disabled={loading}
        className="h-3  rounded-full hover:bg-red-100 text-red-600 disabled:opacity-50"
      >
        <Trash size={18} />
      </button>
      {loading && <span className="text-sm text-gray-500">Deleting...</span>}
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
}

export default ContactListDelete;
