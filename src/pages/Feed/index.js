/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

import api from '../../services/api';

import more from '../../assets/more.svg';
import like from '../../assets/like.svg';
import comment from '../../assets/comment.svg';
import send from '../../assets/send.svg';

import { Container, Post } from './styles';

export default function Feed() {
    const [posts, setPosts] = useState([]);

    function registerToSocket() {
        const socket = io('http://localhost:3333');

        socket.on('post', newPost => {
            setPosts([newPost, ...posts]);
        });

        socket.on('like', likedPost => {
            setPosts(
                posts.map(post => {
                    post.id === likedPost.id ? likedPost : post;
                })
            );
        });
    }

    useEffect(() => {
        registerToSocket();
    }, []);

    useEffect(() => {
        async function loadPosts() {
            const response = await api.get('posts');

            setPosts(response.data);
        }
        loadPosts();
    }, [posts]);

    async function handleLike(id) {
        await api.post(`posts/${id}/like`);
    }

    return (
        <Container>
            {posts.map(post => (
                <Post key={post._id}>
                    <header>
                        <div className="userInfo">
                            <span>{post.author}</span>
                            <span className="place">{post.place}</span>
                        </div>
                        <img src={more} alt="Mais" />
                    </header>
                    <img
                        className="postImg"
                        src={`http://localhost:3333/files/${post.image}`}
                        alt="imagem"
                    />

                    <footer>
                        <div className="actions">
                            <button
                                type="button"
                                onClick={() => handleLike(post._id)}
                            >
                                <img src={like} alt="like" />
                            </button>
                            <img src={comment} alt="comment" />
                            <img src={send} alt="send" />
                        </div>
                        <strong>{post.likes}</strong>

                        <p>
                            {post.description}
                            <span>{post.hashtags}</span>
                        </p>
                    </footer>
                </Post>
            ))}
        </Container>
    );
}
