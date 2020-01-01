/* eslint-disable no-restricted-globals */
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import api from '../../services/api';
import history from '../../services/history';

import { Container } from './styles';

export default function New() {
    const [image, setImage] = useState(null);
    const [author, setAuthor] = useState('');
    const [place, setPlace] = useState('');
    const [description, setDescription] = useState('');
    const [hashtags, setHashtags] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const data = new FormData();
            data.append('image', image);
            data.append('author', author);
            data.append('place', place);
            data.append('description', description);
            data.append('hashtags', hashtags);

            await api.post('posts', data);

            toast.success('Post enviado com sucesso.');
            history.push('/');
        } catch (error) {
            toast.error('Falha ao enviar post, verifique as informações.');
        }
    }

    function handleChange(e) {
        switch (e.target.name) {
            case 'author': {
                setAuthor(e.target.value);
                break;
            }
            case 'place': {
                setPlace(e.target.value);
                break;
            }
            case 'description': {
                setDescription(e.target.value);
                break;
            }
            case 'hashtags': {
                setHashtags(e.target.value);
                break;
            }
            default:
                break;
        }
    }

    function handleImageChange(e) {
        setImage(e.target.files[0]);
    }

    return (
        <Container onSubmit={handleSubmit}>
            <input type="file" onChange={() => handleImageChange(event)} />
            <input
                type="text"
                name="author"
                placeholder="Autor do post"
                onChange={() => handleChange(event)}
                value={author}
            />
            <input
                type="text"
                name="place"
                placeholder="Local do post"
                onChange={() => handleChange(event)}
                value={place}
            />
            <input
                type="text"
                name="description"
                placeholder="Descrição do post"
                onChange={() => handleChange(event)}
                value={description}
            />
            <input
                type="text"
                name="hashtags"
                placeholder="Hashtags do post"
                onChange={() => handleChange(event)}
                value={hashtags}
            />

            <button type="submit">Enviar</button>
        </Container>
    );
}
