import React, { useState } from 'react';
interface EditCategoryModalProps {
  category: any; // Adjust type according to your category structure
  onUpdate: (updatedCategory: any) => void; // Define onUpdate function type
  onClose: () => void;
}
const EditCategoryModal: React.FC<EditCategoryModalProps> = ({ category, onUpdate, onClose }) => {
  const [formData, setFormData] = useState(category);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <div className="modal" style={{ backgroundColor: 'red' }}>
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          {/* Render form fields for editing */}
          {/* Example: <input type="text" name="categoryName" value={formData.categoryName} onChange={handleChange} /> */}
          <button type="submit">Update</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default EditCategoryModal;
