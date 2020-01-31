import React, { Component } from 'react';

import PostItem from './PostItem';

class PostList extends Component {
  state ={ 
    posts: [ //criar um array de posts
      {//cada post está entre {}
        id:1,
        author: {
          name: 'vanessa romero',
          avatar: 'https://i.pravatar.cc/300',
        },
        date: '04 jun 2019',
        content: 'pessoal, a rocketseat está contratando?',
        comments : [
          { 
            id: 2,
            author: 'diego fernandes',
            avatar: 'https://avatars2.githubusercontent.com/u/2254731?v=4',
          },
      ]
    } 
  ]
};

  render() {
    const { posts } = this.state;
        return (
          <div className="postList">
          {posts.map(post =>(
          <PostItem key={post.id} {...post} />
            ))}
          </div>
        );
      }
    }
  

export default PostList;
