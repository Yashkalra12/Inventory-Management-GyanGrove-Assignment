import { useState, useEffect } from 'react';
import InventoryTable from './components/InventoryTable';
import InventoryForm from './components/InventoryForm';

function App() {
  const [items, setItems] = useState([
    { id: 1, name: 'Laptop', category: 'Electronics', quantity: 5, price: 999.99 },
    { id: 2, name: 'Desk Chair', category: 'Furniture', quantity: 12, price: 199.99 },
    { id: 3, name: 'Mouse', category: 'Electronics', quantity: 8, price: 29.99 },
  ]);
  const [editingItem, setEditingItem] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [filterCategory, setFilterCategory] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  const categories = [...new Set(items.map(item => item.category))];

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedItems = [...items].sort((a, b) => {
    if (!sortConfig.key) return 0;
    
    if (sortConfig.direction === 'ascending') {
      return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
    }
    return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
  });

  const filteredItems = sortedItems.filter(item => 
    filterCategory ? item.category === filterCategory : true
  );

  const handleSubmit = (formData) => {
    if (editingItem) {
      setItems(items.map(item => 
        item.id === editingItem.id ? { ...formData, id: item.id } : item
      ));
    } else {
      setItems([...items, { ...formData, id: Date.now() }]);
    }
    setShowForm(false);
    setEditingItem(null);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar */}
      <nav className="bg-indigo-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-center">
            Dynamic Inventory Management Table
          </h1>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-sm rounded-lg p-6">
            <div className="sm:flex sm:items-center sm:justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Inventory Items</h2>
              <button
                onClick={() => setShowForm(true)}
                className="mt-3 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Add New Item
              </button>
            </div>

            {showForm && (
              <div className="mb-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  {editingItem ? 'Edit Item' : 'Add New Item'}
                </h2>
                <InventoryForm
                  item={editingItem}
                  onSubmit={handleSubmit}
                  onCancel={() => {
                    setShowForm(false);
                    setEditingItem(null);
                  }}
                />
              </div>
            )}

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Filter by Category</label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <InventoryTable
              items={filteredItems}
              onEdit={handleEdit}
              onDelete={handleDelete}
              sortConfig={sortConfig}
              onSort={handleSort}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm">
            Made by Yash kalra @ 2025 GyanGrove Assignment
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;