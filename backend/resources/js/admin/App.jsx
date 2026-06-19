import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles.css';
import { Button } from './components/Button/Button';

export default function App() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({
        title: '',
        url: '',
        image: null,
        industry: '',
        project_type: '',
        platform: 'Wordpress',
        status: 'В разработке',
        description: '',
        stack: [],
    });
    const [editingId, setEditingId] = useState(null);

    const platformOptions = ['Wordpress', 'Bitrix', 'Кастомная платформа', 'Другое'];
    const statusOptions = ['В разработке', 'Завершено', 'Поддержка', 'Архивировано'];
    const industryOptions = ['beauty', 'retail', 'horeca', 'construction', 'automotive', 'fitness', 'legal', 'travel', 'education', 'manufacturing'];
    const projectTypeOptions = ['landing', 'corporate-site', 'online-store', 'ads', 'smm'];
    const stackOptions = ['UI/UX дизайн', 'Вёрстка', 'Разработка', 'SEO', 'Контент-менеджмент', 'Интеграция', 'WordPress', '1С-Битрикс', 'Laravel', 'React.js', 'Vue.js', 'PostgreSQL', 'MySQL', 'PHP', 'JavaScript'];

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

        const url = editingId ? `/api/projects/${editingId}` : '/api/projects';

        const formData = new FormData();
        
        Object.keys(form).forEach(key => {
            if (key === 'stack') {
                const stackArray = Array.isArray(form[key]) ? form[key] : [];
                stackArray.forEach(item => formData.append('stack[]', item));
            } else if (key === 'image' && form[key] instanceof File) {
                formData.append('image', form[key]);
            } else if (key === 'image' && !form[key]) {
                // не отправляем пустую картинку
            } else {
                formData.append(key, form[key]);
            }
        });

        if (editingId) {
            formData.append('_method', 'PUT');
        }

        console.log('Sending to:', url);
        console.log('FormData entries:');
        for (let pair of formData.entries()) {
            console.log(pair[0], pair[1]);
        }

        axios.post(url, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        .then(() => {
            fetchProjects();
            resetForm();
        })
        .catch(error => {
            console.error('Error response:', error.response);
            if (error.response) {
                alert('Ошибка валидации:\n' + JSON.stringify(error.response.data.errors, null, 2));
            } else {
                alert('Ошибка: ' + error.message);
            }
        });
    };

    const resetForm = () => {
        setForm({
            title: '',
            url: '',
            image: null,
            industry: '',
            project_type: '',
            platform: 'Wordpress',
            status: 'В разработке',
            description: '',
            stack: [],
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
        console.log('Editing project:', project);
        setForm({
            title: project.title || '',
            url: project.url || '',
            image: null,
            industry: project.industry || '',
            project_type: project.projectType || '',
            platform: project.platform || 'Wordpress',
            status: project.status || 'В разработке',
            description: project.description || '',
            stack: Array.isArray(project.stack) ? project.stack : [],
        });
        setEditingId(project.id);
    };

    const handleStackChange = (e) => {
        const options = e.target.options;
        const selected = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                selected.push(options[i].value);
            }
        }
        setForm({ ...form, stack: selected });
    };

    if (loading) return <div className="container" style={{ padding: '40px' }}>Загрузка...</div>;

    return (
        <div className="container" style={{ padding: '40px' }}>
            <h1 className="subtitle" style={{ marginBottom: '40px' }}>Админка Art Gorka</h1>

            <form onSubmit={handleSubmit} style={{ marginBottom: '40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <input
                    placeholder="Название"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                    className="feedback-modal__input"
                />
                <input
                    placeholder="URL"
                    value={form.url}
                    onChange={(e) => setForm({ ...form, url: e.target.value })}
                    required
                    className="feedback-modal__input"
                />

                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
                    className="feedback-modal__input"
                />

                <select
                    value={form.industry}
                    onChange={(e) => setForm({ ...form, industry: e.target.value })}
                    className="feedback-modal__input"
                >
                    <option value="">Выберите отрасль</option>
                    {industryOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                    ))}
                </select>

                <select
                    value={form.project_type}
                    onChange={(e) => setForm({ ...form, project_type: e.target.value })}
                    className="feedback-modal__input"
                >
                    <option value="">Выберите тип проекта</option>
                    {projectTypeOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                    ))}
                </select>

                <select
                    value={form.platform}
                    onChange={(e) => setForm({ ...form, platform: e.target.value })}
                    className="feedback-modal__input"
                >
                    {platformOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                    ))}
                </select>

                <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="feedback-modal__input"
                >
                    {statusOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                    ))}
                </select>

                <textarea
                    placeholder="Описание (необязательно)"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="feedback-modal__input feedback-modal__textarea"
                    style={{ gridColumn: '1 / -1', minHeight: '60px' }}
                />

                <select
                    multiple
                    value={form.stack}
                    onChange={handleStackChange}
                    className="feedback-modal__input"
                    style={{ gridColumn: '1 / -1', minHeight: '80px' }}
                >
                    {stackOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                    ))}
                </select>

                <Button variant="primary" type="submit" style={{ gridColumn: '1 / -1' }}>
                    {editingId ? 'Сохранить' : 'Создать'}
                </Button>
                {editingId && (
                    <Button variant="secondary" type="button" onClick={resetForm} style={{ gridColumn: '1 / -1' }}>
                        Отмена
                    </Button>
                )}
            </form>

            <ul style={{ listStyle: 'none', padding: 0 }}>
                {projects.map(project => (
                    <li key={project.id} style={{ marginBottom: '24px', borderBottom: '1px solid #eee', paddingBottom: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                                <strong style={{ fontSize: '20px', color: '#696FE5' }}>{project.title}</strong>
                                <span style={{ color: '#424C5C' }}>— {project.platform} — {project.status}</span>
                                {project.image && (
                                    <img 
                                        src={project.image} 
                                        alt={project.title} 
                                        style={{ 
                                            width: '60px', 
                                            height: '60px', 
                                            objectFit: 'cover', 
                                            borderRadius: '8px',
                                            border: '1px solid #e0e0e0'
                                        }} 
                                    />
                                )}
                            </div>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <Button variant="secondary" onClick={() => handleEdit(project)}>Edit</Button>
                                <Button variant="primary" onClick={() => handleDelete(project.id)}>Delete</Button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}