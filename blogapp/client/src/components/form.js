import { useState } from "react";
import { useEffect } from "react";
import EditForm from "./editform";

const Form = () => {
  const [posts, setPosts] = useState([]);

  const [newPost, setNewPost] = useState({
    post: "",
    image: "",
  });

  const getPosts = async () => {
    const response = await fetch("http://localhost:8081/api/blogs");
    const posts = await response.json();
    setPosts(posts);
  };

  useEffect(() => {
    getPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const addedPost = {
      post: newPost.post,
      image: newPost.image,
    };

    const response = await fetch("http://localhost:8081/api/blogs", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addedPost),
    });
    const content = await response.json();

    setPosts([...posts, content]);
    setNewPost({
      post: "",
      image: "",
    });
  };

  return (
    <section className="mapping-section">
      <h2>Blog Posts</h2>
      {posts.map((posts, index) => {
        return (
          <tr key={index}>
            <td>{posts.id}</td>
            <td>{posts.timestamp}</td>
            <td>{posts.post}</td>
            <td>{posts.image}</td>
          </tr>
        );
      })}
      <form onSubmit={handleSubmit}>
        <div id="form-card">
          <fieldset>
            <label>New Post</label>
            <input
              type="text"
              id="add-post"
              value={newPost.post}
              onChange={(e) => {
                //passing in event
                setNewPost((prev) => ({
                  ...prev, //whatever is prev in obj us spread op.. and them here
                  post: e.target.value,
                }));
              }}
            />
          </fieldset>
          <button className="add-post-btn" type="submit">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
