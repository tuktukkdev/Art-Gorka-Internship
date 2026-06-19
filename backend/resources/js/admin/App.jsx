import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles.css';

const URL_REGEX = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;

const PLATFORM_OPTIONS = ['Wordpress', 'Bitrix', 'Кастомная платформа', 'Другое'];
const STATUS_OPTIONS   = ['В разработке', 'Завершено', 'Поддержка', 'Архивировано'];
const STACK_OPTIONS    = ['Разработка сайта', 'Дизайн', 'SEO', 'Контекстная реклама', 'Обслуживание', 'SMM'];

const STATUS_BADGE = {
    'Завершено':    'badge--green',
    'В разработке': 'badge--blue',
    'Поддержка':    'badge--orange',
    'Архивировано': 'badge--gray',
};

const EMPTY_FORM = {
    title: '',
    url: '',
    image: null,
    industry: '',
    project_type: '',
    platform: 'Wordpress',
    status: 'В разработке',
    description: '',
    stack: [],
};

const IconEdit = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
);

const IconTrash = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="3 6 5 6 21 6"/>
        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
        <path d="M10 11v6M14 11v6"/>
        <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
    </svg>
);

const IconImage = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <circle cx="8.5" cy="8.5" r="1.5"/>
        <polyline points="21 15 16 10 5 21"/>
    </svg>
);

export default function App() {
    const [projects, setProjects]   = useState([]);
    const [loading, setLoading]     = useState(true);
    const [form, setForm]           = useState(EMPTY_FORM);
    const [editingId, setEditingId] = useState(null);
    const [errors, setErrors]       = useState({});

    const fetchProjects = () => {
        setLoading(true);
        axios.get('/api/projects')
            .then(r => { setProjects(r.data.data); setLoading(false); })
            .catch(e => { console.error(e); setLoading(false); });
    };

    useEffect(() => { fetchProjects(); }, []);

    const validate = () => {
        const e = {};
        if (!form.title.trim())                  e.title        = 'Обязательное поле';
        else if (form.title.length > 60)         e.title        = 'Максимум 60 символов';
        if (!form.url.trim())                    e.url          = 'Обязательное поле';
        else if (!URL_REGEX.test(form.url))      e.url          = 'Введите корректный URL (https://...)';
        if (!form.industry.trim())               e.industry     = 'Обязательное поле';
        else if (form.industry.length > 30)      e.industry     = 'Максимум 30 символов';
        if (!form.project_type.trim())           e.project_type = 'Обязательное поле';
        else if (form.project_type.length > 30)  e.project_type = 'Максимум 30 символов';
        if (!form.description.trim())            e.description  = 'Обязательное поле';
        else if (form.description.length > 500)  e.description  = 'Максимум 500 символов';
        if (!form.stack.length)                  e.stack        = 'Выберите хотя бы одну услугу';
        return e;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});

        const url      = editingId ? `/api/projects/${editingId}` : '/api/projects';
        const formData = new FormData();

        Object.keys(form).forEach(key => {
            if (key === 'stack') {
                (Array.isArray(form[key]) ? form[key] : []).forEach(item => formData.append('stack[]', item));
            } else if (key === 'image' && form[key] instanceof File) {
                formData.append('image', form[key]);
            } else if (key !== 'image') {
                formData.append(key, form[key]);
            }
        });

        if (editingId) formData.append('_method', 'PUT');

        console.log('Sending to:', url);
        for (let pair of formData.entries()) console.log(pair[0], pair[1]);

        axios.post(url, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then(() => { fetchProjects(); resetForm(); })
            .catch(error => {
                console.error('Error response:', error.response);
                if (error.response?.data?.errors) {
                    alert('Ошибка валидации:\n' + JSON.stringify(error.response.data.errors, null, 2));
                } else {
                    alert('Ошибка: ' + error.message);
                }
            });
    };

    const resetForm = () => {
        setForm(EMPTY_FORM);
        setEditingId(null);
        setErrors({});
    };

    const handleDelete = (id) => {
        if (!confirm('Удалить проект?')) return;
        axios.delete(`/api/projects/${id}`)
            .then(() => fetchProjects())
            .catch(e => console.error(e));
    };

    const handleEdit = (project) => {
        console.log('Editing project:', project);
        setForm({
            title:        project.title       || '',
            url:          project.url         || '',
            image:        null,
            industry:     project.industry    || '',
            project_type: project.projectType || '',
            platform:     project.platform    || 'Wordpress',
            status:       project.status      || 'В разработке',
            description:  project.description || '',
            stack:        Array.isArray(project.stack) ? project.stack : [],
        });
        setEditingId(project.id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const toggleStack = (opt) => {
        setForm(f => ({
            ...f,
            stack: f.stack.includes(opt)
                ? f.stack.filter(s => s !== opt)
                : [...f.stack, opt],
        }));
    };

    return (
        <div className="admin-page">
            <header className="admin-header">
                <span className="admin-header__logo">Art Gorka</span>
                <span className="admin-header__sep" />
                <span className="admin-header__sub">Панель управления</span>
                <div style={{ marginLeft: 'auto' }}>
                    <form method="POST" action="/admin/logout">
                        <input type="hidden" name="_token" value={document.querySelector('meta[name="csrf-token"]')?.content} />
                        <button className="btn btn--ghost btn--sm" type="submit">Выйти</button>
                    </form>
                </div>
            </header>

            <div className="admin-body">
                {/* ─── Form card ─── */}
                <div className="admin-card">
                    <div className="admin-card__head">
                        <span className="admin-card__title">
                            {editingId ? 'Редактирование проекта' : 'Новый проект'}
                        </span>
                        {editingId && (
                            <button className="btn btn--ghost btn--sm" type="button" onClick={resetForm}>
                                Отмена
                            </button>
                        )}
                    </div>
                    <div className="admin-card__body">
                        <form className="admin-form" onSubmit={handleSubmit}>

                            <div className="admin-form__field">
                                <label className="admin-form__label">
                                    Название<span className="admin-form__required">*</span>
                                </label>
                                <input
                                    className={`admin-form__input${errors.title ? ' admin-form__input--error' : ''}`}
                                    placeholder="Например: «Сайт для кафе»"
                                    value={form.title}
                                    maxLength={60}
                                    onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                                />
                                {errors.title
                                    ? <span className="admin-form__error">{errors.title}</span>
                                    : <span className="admin-form__counter">{form.title.length}/60</span>}
                            </div>

                            <div className="admin-form__field">
                                <label className="admin-form__label">
                                    URL<span className="admin-form__required">*</span>
                                </label>
                                <input
                                    className={`admin-form__input${errors.url ? ' admin-form__input--error' : ''}`}
                                    placeholder="https://example.com"
                                    value={form.url}
                                    onChange={e => setForm(f => ({ ...f, url: e.target.value }))}
                                />
                                {errors.url && <span className="admin-form__error">{errors.url}</span>}
                            </div>

                            <div className="admin-form__field">
                                <label className="admin-form__label">Изображение</label>
                                <label className="admin-form__file-label">
                                    <IconImage />
                                    <span>{form.image ? form.image.name : 'Выбрать файл...'}</span>
                                    <input
                                        className="admin-form__file-input"
                                        type="file"
                                        accept="image/*"
                                        onChange={e => setForm(f => ({ ...f, image: e.target.files[0] || null }))}
                                    />
                                </label>
                                {editingId && !form.image && (
                                    <span className="admin-form__hint">Оставьте пустым, чтобы сохранить текущее фото</span>
                                )}
                            </div>

                            <div className="admin-form__field">
                                <label className="admin-form__label">
                                    Отрасль<span className="admin-form__required">*</span>
                                </label>
                                <input
                                    className={`admin-form__input${errors.industry ? ' admin-form__input--error' : ''}`}
                                    placeholder="Например: Ресторанный бизнес"
                                    value={form.industry}
                                    maxLength={30}
                                    onChange={e => setForm(f => ({ ...f, industry: e.target.value }))}
                                />
                                {errors.industry
                                    ? <span className="admin-form__error">{errors.industry}</span>
                                    : <span className="admin-form__counter">{form.industry.length}/30</span>}
                            </div>

                            <div className="admin-form__field">
                                <label className="admin-form__label">
                                    Тип проекта<span className="admin-form__required">*</span>
                                </label>
                                <input
                                    className={`admin-form__input${errors.project_type ? ' admin-form__input--error' : ''}`}
                                    placeholder="Например: Интернет-магазин"
                                    value={form.project_type}
                                    maxLength={30}
                                    onChange={e => setForm(f => ({ ...f, project_type: e.target.value }))}
                                />
                                {errors.project_type
                                    ? <span className="admin-form__error">{errors.project_type}</span>
                                    : <span className="admin-form__counter">{form.project_type.length}/30</span>}
                            </div>

                            <div className="admin-form__field">
                                <label className="admin-form__label">Платформа</label>
                                <select
                                    className="admin-form__input admin-form__select"
                                    value={form.platform}
                                    onChange={e => setForm(f => ({ ...f, platform: e.target.value }))}
                                >
                                    {PLATFORM_OPTIONS.map(opt => <option key={opt}>{opt}</option>)}
                                </select>
                            </div>

                            <div className="admin-form__field">
                                <label className="admin-form__label">Статус</label>
                                <select
                                    className="admin-form__input admin-form__select"
                                    value={form.status}
                                    onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                                >
                                    {STATUS_OPTIONS.map(opt => <option key={opt}>{opt}</option>)}
                                </select>
                            </div>

                            <div className="admin-form__field">
                                <label className="admin-form__label">
                                    Описание<span className="admin-form__required">*</span>
                                </label>
                                <textarea
                                    className={`admin-form__input admin-form__textarea${errors.description ? ' admin-form__input--error' : ''}`}
                                    placeholder="Краткое описание проекта..."
                                    value={form.description}
                                    maxLength={500}
                                    onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                                />
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    {errors.description
                                        ? <span className="admin-form__error">{errors.description}</span>
                                        : <span />}
                                    <span className="admin-form__counter">{form.description.length}/500</span>
                                </div>
                            </div>

                            <div className="admin-form__field">
                                <label className="admin-form__label">
                                    Стек<span className="admin-form__required">*</span>
                                </label>
                                <div className={`admin-form__checkboxes${errors.stack ? ' admin-form__checkboxes--error' : ''}`}>
                                    {STACK_OPTIONS.map(opt => (
                                        <label key={opt} className="admin-form__checkbox-label">
                                            <input
                                                type="checkbox"
                                                className="admin-form__checkbox"
                                                checked={form.stack.includes(opt)}
                                                onChange={() => toggleStack(opt)}
                                            />
                                            <span>{opt}</span>
                                        </label>
                                    ))}
                                </div>
                                {errors.stack && <span className="admin-form__error">{errors.stack}</span>}
                            </div>

                            <div className="admin-form__actions">
                                <button className="btn btn--primary btn--full" type="submit">
                                    {editingId ? 'Сохранить изменения' : 'Создать проект'}
                                </button>
                                {editingId && (
                                    <button className="btn btn--secondary btn--full" type="button" onClick={resetForm}>
                                        Отмена
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>

                {/* ─── Table card ─── */}
                <div className="admin-card">
                    <div className="admin-card__head">
                        <span className="admin-card__title">Проекты</span>
                        <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                            {projects.length} шт.
                        </span>
                    </div>

                    {loading ? (
                        <div className="admin-loading">Загрузка...</div>
                    ) : projects.length === 0 ? (
                        <div className="admin-empty">Проектов пока нет</div>
                    ) : (
                        <div className="admin-table-wrap">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Фото</th>
                                        <th>Название / URL</th>
                                        <th>Платформа</th>
                                        <th>Статус</th>
                                        <th>Стек</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {projects.map(project => (
                                        <tr key={project.id}>
                                            <td>
                                                {project.image ? (
                                                    <img className="admin-table__img" src={project.image} alt={project.title} />
                                                ) : (
                                                    <div className="admin-table__img-placeholder">
                                                        <IconImage />
                                                    </div>
                                                )}
                                            </td>
                                            <td>
                                                <div className="admin-table__title">{project.title}</div>
                                                <a
                                                    className="admin-table__url"
                                                    href={project.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    style={{ pointerEvents: 'auto' }}
                                                >
                                                    {project.url}
                                                </a>
                                                {project.industry && (
                                                    <div className="admin-table__meta">{project.industry}</div>
                                                )}
                                            </td>
                                            <td>
                                                <span className="badge badge--gray">{project.platform}</span>
                                            </td>
                                            <td>
                                                <span className={`badge ${STATUS_BADGE[project.status] || 'badge--gray'}`}>
                                                    {project.status}
                                                </span>
                                            </td>
                                            <td>
                                                {Array.isArray(project.stack) && project.stack.length > 0 ? (
                                                    <div className="admin-table__stack">
                                                        {project.stack.map(s => (
                                                            <span key={s} className="badge badge--stack">{s}</span>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>—</span>
                                                )}
                                            </td>
                                            <td>
                                                <div className="admin-table__actions">
                                                    <button className="btn btn--ghost" onClick={() => handleEdit(project)} title="Редактировать">
                                                        <IconEdit />
                                                    </button>
                                                    <button className="btn btn--danger" onClick={() => handleDelete(project.id)} title="Удалить">
                                                        <IconTrash />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
