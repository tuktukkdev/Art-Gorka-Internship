import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function App() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({
        title: '',
        url: '',
        platform: 'wordpress',
        status: 'development',
        description: '',
    });
    const [editingId, setEditingId] = useState(null);

    const fetchProjects = () => {
        setLoading(true);
        axios.get('/api/projects')
            .then(response => {
                setProjects(response.data.data);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const method = editingId ? 'put' : 'post';
        const url = editingId ? `/api/projects/${editingId}` : '/api/projects';

        axios[method](url, form)
            .then(() => {
                fetchProjects();
                resetForm();
            })
            .catch(error => {
                if (error.response) {
                    alert('Ошибка валидации:\n' + JSON.stringify(error.response.data.errors, null, 2));
                } else {
                    console.error(error.message);
                }
            });
    };

    const resetForm = () => {
        setForm({
            title: '',
            url: '',
            platform: 'wordpress',
            status: 'development',
            description: '',
        });
        setEditingId(null);
    };

    const handleDelete = (id) => {
        if (!confirm('Удалить проект?')) return;
        axios.delete(`/api/projects/${id}`)
            .then(() => fetchProjects())
            .catch(error => console.error(error));
    };

    const handleEdit = (project) => {
        setForm({
            title: project.title,
            url: project.url,
            platform: project.platform,
            status: project.status,
            description: project.description || '',
        });
        setEditingId(project.id);
    };

    if (loading) return <div>Загрузка...</div>;

    return (
        <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
            <h1>Админка Art Gorka</h1>

            <form onSubmit={handleSubmit} style={{ marginBottom: '40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <input
                    placeholder="Название"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                />
                <input
                    placeholder="URL"
                    value={form.url}
                    onChange={(e) => setForm({ ...form, url: e.target.value })}
                    required
                />
                <select
                    value={form.platform}
                    onChange={(e) => setForm({ ...form, platform: e.target.value })}
                >
                    <option value="wordpress">WordPress</option>
                    <option value="bitrix">Bitrix</option>
                    <option value="custom">Custom</option>
                    <option value="other">Other</option>
                </select>
                <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                >
                    <option value="development">Development</option>
                    <option value="production">Production</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="archived">Archived</option>
                </select>
                <textarea
                    placeholder="Описание (необязательно)"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    style={{ gridColumn: '1 / -1', minHeight: '60px' }}
                />
                <button type="submit">
                    {editingId ? 'Сохранить' : 'Создать'}
                </button>
                {editingId && (
                    <button type="button" onClick={resetForm}>
                        Отмена
                    </button>
                )}
            </form>

            <ul style={{ listStyle: 'none', padding: 0 }}>
                {projects.map(project => (
                    <li key={project.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #eee' }}>
                        <div>
                            <strong>{project.title}</strong> — {project.platform} — {project.status}
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button onClick={() => handleEdit(project)}>Edit</button>
                            <button onClick={() => handleDelete(project.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}